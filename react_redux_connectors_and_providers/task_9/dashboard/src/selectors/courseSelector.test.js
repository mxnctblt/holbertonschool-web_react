import { fromJS } from 'immutable';
import { getCourses } from './courseSelector';

describe('courseSelector', () => {
  it('should return a List of courses', () => {
    const state = fromJS({
      courses: {
        1: { id: 1, name: 'ES6', credit: 60 },
        2: { id: 2, name: 'Webpack', credit: 20 },
        3: { id: 3, name: 'React', credit: 40 }
      }
    });

    const expectedCourses = fromJS([
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]);

    const result = getCourses(state);
    expect(result).toEqual(expectedCourses);
  });
});
