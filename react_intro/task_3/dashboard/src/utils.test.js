import { getFooterCopy, getFullYear, getLatestNotification } from './utils';

describe('getFullYear function', () => {
    it('should return the correct year', () => {
        const currentYear = new Date().getFullYear();
        expect(getFullYear()).toEqual(currentYear);
    });
});

describe('getFooterCopy function', () => {
    it('returns the correct string when the argument is true', () => {
		expect(getFooterCopy(true)).toEqual('Holberton School');
	});
    it('returns the correct string when the argument is false', () => {
		expect(getFooterCopy(false)).toEqual('Holberton School main dashboard');
	});
});

describe('getLatestNotification function', () => {
    it('returns the correct string', () => {
        expect(getLatestNotification()).toEqual("<strong>Urgent requirement</strong> - complete by EOD");
    });
});
