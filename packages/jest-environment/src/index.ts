/* eslint-disable filenames/match-exported */

import VM from 'vm';
import * as JestUtil from 'jest-util';
import { ModuleMocker } from 'jest-mock';
import { LegacyFakeTimers, ModernFakeTimers } from '@jest/fake-timers';
import { JestEnvironment, EnvironmentContext } from '@jest/environment';
import { Window } from 'happy-dom';
import { Script } from 'vm';
import { Global, Config } from '@jest/types';

/**
 * Happy DOM Jest Environment.
 */
export default class HappyDOMEnvironment implements JestEnvironment {
	public fakeTimers: LegacyFakeTimers<number> = null;
	public fakeTimersModern: ModernFakeTimers = null;
	public global: Global.Global = <Global.Global>(<undefined>new Window());
	public moduleMocker: ModuleMocker = new ModuleMocker(<NodeJS.Global>this.global);

	/**
	 * Constructor.
	 *
	 * @param config Jest config.
	 * @param options Options.
	 */
	constructor(config: Config.ProjectConfig, options?: EnvironmentContext) {
		VM.createContext(this.global);

		// Functions are not an instanceof the "Function" class in the VM context, so therefore we set it to the used "Function" class.
		VM.runInContext('window.Function = (() => {}).constructor;', this.global);

		// Node's error-message stack size is limited to 10, but it's pretty useful to see more than that when a test fails.
		this.global.Error.stackTraceLimit = 100;

		// TODO: Remove this ASAP as it currently causes tests to run really slow.
		this.global.Buffer = Buffer;

		// Needed as Jest is using it
		this.global.global = this.global;

		JestUtil.installCommonGlobals(this.global, config.globals);

		if (options && options.console) {
			this.global.console = options.console;
			this.global.window['console'] = options.console;
		}

		this.fakeTimers = new LegacyFakeTimers({
			config,
			global: this.global,
			moduleMocker: this.moduleMocker,
			timerConfig: {
				idToRef: (id: number) => id,
				refToId: (ref: number) => ref
			}
		});

		this.fakeTimersModern = new ModernFakeTimers({
			config,
			global: this.global
		});
	}

	/**
	 * Setup.
	 *
	 * @returns Promise.
	 */
	public async setup(): Promise<void> {}

	/**
	 * Teardown.
	 *
	 * @returns Promise.
	 */
	public async teardown(): Promise<void> {
		this.fakeTimers.dispose();
		this.fakeTimersModern.dispose();
		this.global.happyDOM['cancelAsync']();

		this.global = null;
		this.moduleMocker = null;
		this.fakeTimers = null;
		this.fakeTimersModern = null;
	}

	/**
	 * Runs a script.
	 *
	 * @param script Script.
	 * @returns Result.
	 */
	public runScript(script: Script): null {
		return script.runInContext(this.global);
	}

	/**
	 * Returns the VM context.
	 *
	 * @returns Context.
	 */
	public getVmContext(): VM.Context {
		return this.global;
	}
}
