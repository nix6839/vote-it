import type { Locator } from '@playwright/test';

export default class Locators {
	readonly closeDialogButton: Locator;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly signUpButton: Locator;
	readonly loginButton: Locator;
	readonly windowToSignUpButton: Locator;
	readonly windowToLoginButton: Locator;

	constructor(component: Locator) {
		this.closeDialogButton = component.getByRole('button', {
			name: '모달 닫기',
		});
		this.emailInput = component.getByRole('textbox', { name: '이메일' });
		this.passwordInput = component.getByLabel('비밀번호');
		this.signUpButton = component.getByRole('button', { name: '회원가입' });
		this.loginButton = component.getByRole('button', { name: '로그인' });
		this.windowToSignUpButton = component.getByRole('button', {
			name: '회원가입!',
		});
		this.windowToLoginButton = component.getByRole('button', {
			name: '로그인!',
		});
	}
}
