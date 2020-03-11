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
import { BooleanFunction, SingleValidationRule, when } from 'doov';

let A, B, C, D: BooleanFunction;
let doc: HTMLElement;
let rule: SingleValidationRule;

let model = new Model();
let user = new User(0);
user.name = 'Bob';
user.birth = new Date(2019, 11, 11);
user.b = false;
model.user = user;

const zeroField = DOOV.number(DOOV.field('user', 'id'));
const yesterdayField = DOOV.date(DOOV.field('user', 'birth'));
const bobField = DOOV.string(DOOV.field('user', 'name'));
const falseField = DOOV.boolean(DOOV.field('user', 'b'));

const getTextArray = (elt: Element) => elt.textContent;

describe('tests of or', function() {
  it('or true false complex', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, false);
    C = DOOV.lift(BooleanFunction, true);
    rule = when(A.or(B.or(C))).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or', 'or']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'false', 'true']);
  });
  it('or false true complex', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, true);
    C = DOOV.lift(BooleanFunction, true);
    rule = when(A.or(B.and(C))).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(2);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or', 'and']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'true', 'true']);
  });
  it('or false false', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, false);
    rule = when(A.or(B)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'false']);
  });
  it('or false false complex', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, false);
    C = DOOV.lift(BooleanFunction, true);
    rule = when(A.or(B.and(C))).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(2);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or', 'and']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'false', 'true']);
  });
  it('or true false', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, false);
    rule = when(A.or(B)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'false']);
  });
  it('or false true', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, true);
    rule = when(A.or(B)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'true']);
  });
  it('or true true', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, true);
    rule = when(A.or(B)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['or']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'true']);
  });
  it('or field true true', () => {
    A = zeroField.lesserThan(4);
    B = yesterdayField.before(DOOV.DateFunction.today());
    rule = when(A.or(B)).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute(model).value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['<', 'or', '<', 'today']);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.id', 'user.birth']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['4']);
  });
  it('or or or', () => {
    A = zeroField.lesserThan(4);
    B = yesterdayField.before(DOOV.DateFunction.today());
    C = bobField.startsWith('B');
    D = falseField.eq(false);
    const rule = when(
      A.or(B)
        .or(C)
        .or(D)
    ).validate() as SingleValidationRule;
    doc = render(<DoovReact metadata={rule.metadata} />).container;

    expect(rule.execute(model).value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      '<',
      'or',
      '<',
      'today',
      'or',
      'starts with',
      'or',
      '=',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.id',
      'user.birth',
      'user.name',
      'user.b',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['4', '"B"', 'false']);
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
});
