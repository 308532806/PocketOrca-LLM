#!/usr/bin/env node
/* bench.js 状态机冒烟测试（stub DOM + stub bridge，不依赖 Android）
 * 用法: node mod/tools/test_bench_smoke.js
 * 覆盖：三引擎完整流程（启动→预热→测量→恢复）+ 中途取消。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const code = fs.readFileSync(path.join(__dirname, '../assets/bench.js'), 'utf8');

const els = {};
function el(id) {
  if (!els[id]) {
    const item = {
      id, textContent: '', innerHTML: '', value: '', checked: id === 'reasoning',
      style: {}, _cls: new Set(),
      classList: {
        add(c) { item._cls.add(c); }, remove(c) { item._cls.delete(c); },
        toggle(c, f) { f ? item._cls.add(c) : item._cls.delete(c); },
      },
    };
    els[id] = item;
  }
  return els[id];
}

function makeEnv(initialRunning) {
  const calls = [];
  const env = {
    console, setTimeout, clearTimeout,
    document: { getElementById: el },
    els, calls,
    T: (x) => x,
    toastT: (m) => calls.push(['toast', m]),
    toast: () => {},
    port: () => 8080,
    model: { path: '/sdcard/Download/gguf/m.gguf', name: 'm.gguf' },
    profileId: 'htp', ctxSize: 8192, ubatch: 1024, threads: 4,
    onHttpDone: (st, p) => calls.push(['origHttp', st]),
    _state: initialRunning ? 'running' : 'ready',
    _running: !!initialRunning,
    _failEngine: null,
    _mockBegin: (pid) => {
      env._state = 'starting';
      env._running = false;
      setTimeout(() => {
        if (pid === env._failEngine) { env._state = 'error'; return; }
        env._state = 'running'; env._running = true;
      }, 50);
    },
    doStart: (a) => {
      calls.push(['start', a.profileId]);
      env._lastStart = a;
      env._mockBegin(a.profileId);
    },
    bridge: (name, ...args) => {
      if (name === 'stopServer') { calls.push(['stop']); env._state = 'ready'; env._running = false; return undefined; }
      if (name === 'getStatus') return JSON.stringify({ state: env._state, running: env._running, port: 8080, profile: 'htp' });
      if (name === 'isPortBusy') return !!env._running;
      if (name === 'httpPost') {
        calls.push(['post', args[1].includes('"n_predict":64') ? 'measure' : 'warm']);
        setTimeout(() => {
          env.onHttpDone('200', JSON.stringify({
            timings: { prompt_n: 250, prompt_per_second: 50.5, predicted_n: 64, predicted_per_second: 20.2 },
          }));
        }, 20);
        return undefined;
      }
      throw new Error('unexpected bridge call: ' + name);
    },
  };
  env.window = env;
  return env;
}

function runScenario(name, initialRunning, canceller, cb) {
  const env = makeEnv(initialRunning);
  vm.createContext(env);
  vm.runInContext(code, env);
  const t0 = Date.now();
  env.benchStart();
  if (canceller) canceller(env);
  (function waitDone() {
    if (env.benchRunning) {
      if (Date.now() - t0 > 60000) { console.error(name, 'TIMEOUT'); process.exit(1); }
      return setTimeout(waitDone, 150);
    }
    cb(env, name);
  })();
}

let failures = 0;
function check(cond, msg) {
  if (!cond) { console.error('  FAIL:', msg); failures++; }
  else console.log('  ok:', msg);
}

let scenariosDone = 0;
function scenarioFinished() {
  scenariosDone++;
  if (scenariosDone === 3) {
    console.log(failures ? '\nSMOKE TEST: ' + failures + ' FAILURE(S)' : '\nSMOKE TEST: ALL OK');
    process.exit(failures ? 1 : 0);
  }
}

/* ---------- 场景 1：三引擎完整流程（初始运行中） ---------- */
console.log('scenario 1: full 3-engine run (was running)');
runScenario('full', true, null, (env) => {
  check(env.benchItems.htp && env.benchItems.htp.phase === 'done', 'htp done');
  check(env.benchItems.ocl && env.benchItems.ocl.phase === 'done', 'ocl done');
  check(env.benchItems.cpu && env.benchItems.cpu.phase === 'done', 'cpu done');
  check(Math.abs(env.benchItems.cpu.tg - 20.2) < 1e-6, 'tg value parsed (20.2)');
  check(env.benchItems.cpu.pp === 50.5, 'pp value parsed (50.5)');
  const starts = env.calls.filter((c) => c[0] === 'start').map((c) => c[1]);
  check(JSON.stringify(starts) === JSON.stringify(['htp', 'ocl', 'cpu', 'htp']),
    'start order + restore, got ' + JSON.stringify(starts));
  const stats = env.els.benchStat.textContent;
  check(stats.includes('最快'), 'finish message contains 最快: ' + stats);
  check(env.els.btnBench.textContent === '开始测速', 'button reset: ' + JSON.stringify(env.els.btnBench.textContent));
  scenarioFinished();
});

/* ---------- 场景 2：中途取消（初始未运行） ---------- */
console.log('scenario 2: abort mid-run (was idle)');
runScenario('abort', false, (env) => {
  setTimeout(() => { env.benchStart(); }, 250); // 二次点击 = 取消
}, (env) => {
  const starts = env.calls.filter((c) => c[0] === 'start').map((c) => c[1]);
  check(starts.length === 0, 'no engine start after abort (was idle), starts=' + JSON.stringify(starts));
  check(env.els.benchStat.textContent.includes('已取消'), 'cancelled message: ' + env.els.benchStat.textContent);
  check(env.els.btnBench.textContent === '开始测速', 'button reset after abort');
  scenarioFinished();
});

/* ---------- 场景 3：GPU(ocl) 引擎启动失败，其余继续（初始未运行） ---------- */
console.log('scenario 3: ocl start failure, others continue (was idle)');
runScenario('fail', false, (env) => { env._failEngine = 'ocl'; }, (env) => {
  check(env.benchItems.htp && env.benchItems.htp.phase === 'done', 'htp done');
  check(env.benchItems.ocl && env.benchItems.ocl.phase === 'fail' &&
    env.benchItems.ocl.reason === '启动失败', 'ocl marked failed, got ' + JSON.stringify(env.benchItems.ocl));
  check(env.benchItems.cpu && env.benchItems.cpu.phase === 'done', 'cpu still done');
  const starts = env.calls.filter((c) => c[0] === 'start').map((c) => c[1]);
  check(JSON.stringify(starts) === JSON.stringify(['htp', 'ocl', 'cpu']),
    'no restore start when idle, starts=' + JSON.stringify(starts));
  check(env.els.benchStat.textContent.includes('最快'), 'finish msg: ' + env.els.benchStat.textContent);
  scenarioFinished();
});
