import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { StyleSheetTestUtils } from 'aphrodite';
import fetchMock from 'jest-fetch-mock';
import 'whatwg-fetch';

configure({ adapter: new Adapter() });

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  fetchMock.enableMocks();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  fetchMock.disableMocks();
});
