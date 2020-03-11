import * as React from 'react';
import * as DOOV from 'doov';
import { render } from '@testing-library/react';
import { Model, User } from './model';
import { DoovReact } from '../src/doov-react';
import { HtmlSelector } from './HtmlSelector';
import NARY_OL = HtmlSelector.NARY_OL;
import BINARY_LI = HtmlSelector.BINARY_LI;
import NARY_LI = HtmlSelector.NARY_LI;
import LEAF_LI = HtmlSelector.LEAF_LI;
import WHEN_UL = HtmlSelector.WHEN_UL;
import BINARY_UL = HtmlSelector.BINARY_UL;
import BINARYCHILD_UL = HtmlSelector.BINARYCHILD_UL;
import UNARY_UL = HtmlSelector.UNARY_UL;
import TOKEN_VALUE_SPAN = HtmlSelector.TOKEN_VALUE_SPAN;
import TOKEN_OPERATOR_SPAN = HtmlSelector.TOKEN_OPERATOR_SPAN;
import TOKEN_FIELD_SPAN = HtmlSelector.TOKEN_FIELD_SPAN;
import TOKEN_NARY_SPAN = HtmlSelector.TOKEN_NARY_SPAN;
import { matchAll, SingleValidationRule, when, BooleanFunction } from 'doov';

let A, B, C: BooleanFunction;
let doc: HTMLElement;
let rule: SingleValidationRule;

let model = new Model();
let user = new User(0);
user.name = 'something';
user.birth = new Date(2019, 11, 11);
model.user = user;

const zeroField = DOOV.number(DOOV.field('user', 'id'));
const yesterdayField = DOOV.date(DOOV.field('user', 'birth'));
const somethingField = DOOV.string(DOOV.field('user', 'name'));

const getTextArray = (elt: Element) => elt.textContent;

describe('tests of matchAll', () => {
  it('matchAll true true true', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, true);
    C = DOOV.lift(BooleanFunction, true);
    rule = when(matchAll(A, B, C)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(3);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'true', 'true']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['match all']);
  });
  it('matchAll true true false', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, true);
    C = DOOV.lift(BooleanFunction, false);
    rule = when(matchAll(A, B, C)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(3);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'true', 'false']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['match all']);
  });
  it('matchAll true false false', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, false);
    C = DOOV.lift(BooleanFunction, false);
    rule = when(matchAll(A, B, C)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(3);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'false', 'false']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['match all']);
  });
  it('matchAll false false false', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, false);
    C = DOOV.lift(BooleanFunction, false);
    rule = when(matchAll(A, B, C)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(3);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'false', 'false']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['match all']);
  });
  it('matchAll field false false false failure', () => {
    A = zeroField.greaterThan(4);
    B = yesterdayField.after(DOOV.DateFunction.today());
    C = somethingField.matches('^other.*');
    rule = when(matchAll(A, B, C)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(3);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      '>',
      '>',
      'today',
      'matches',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.id',
      'user.birth',
      'user.name',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['4', '"^other.*"']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['match all']);
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
  // debug();
});
