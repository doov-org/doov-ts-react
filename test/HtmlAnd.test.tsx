import * as React from 'react';
import * as DOOV from 'doov';
import { count, SingleValidationRule, when } from 'doov';
import { render } from '@testing-library/react';
import { Model, User } from './model';
import { GetHtml } from '../src/doov-react';
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
import { BooleanFunction } from 'doov';

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

describe('tests of and', () => {
  it('and false false', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, false);
    rule = when(A.and(B)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['and']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'false']);
  });

  it('and true false', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, false);
    rule = when(A.and(B)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['and']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'false']);
  });

  it('and false true', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, true);
    rule = when(A.and(B)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['and']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'true']);
  });

  it('and true true', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, true);
    rule = when(A.and(B)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['and']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true', 'true']);
  });

  it('and field true true failure', () => {
    A = zeroField.lesserThan(4);
    B = yesterdayField.before(DOOV.DateFunction.today());
    rule = when(A.and(B)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['<', 'and', '<', 'today']);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.id', 'user.birth']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['4']);
  });

  it('and and and', () => {
    A = zeroField.lesserThan(4);
    B = yesterdayField.before(DOOV.DateFunction.today());
    C = bobField.startsWith('B');
    D = falseField.eq(false);
    rule = when(
      A.and(B)
        .and(C)
        .and(D)
    ).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
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
      'and',
      '<',
      'today',
      'and',
      'starts with',
      'and',
      '=',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.id',
      'user.birth',
      'user.name',
      'user.b',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['4', '"B"', 'false']);
    //expect(wrapper.queryAllByRole(TOKEN_NARY_SPAN).map( ??? ).length);
  });

  it('and and count', () => {
    A = zeroField.lesserThan(4);
    B = yesterdayField.before(DOOV.DateFunction.today());
    C = bobField.startsWith('B');
    D = falseField.eq(false);
    rule = when(A.and(B.and(count(C, D).greaterThan(1)))).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(3);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      '<',
      'and',
      '<',
      'today',
      'and',
      'starts with',
      '=',
      '>',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.id',
      'user.birth',
      'user.name',
      'user.b',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['4', '"B"', 'false', '1']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['count']);
  });

  it('and or and', () => {
    A = zeroField.lesserThan(4);
    B = yesterdayField.before(DOOV.DateFunction.today());
    C = bobField.startsWith('B');
    D = falseField.eq(false);
    rule = when(A.and(B).or(C.and(D))).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(2);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      '<',
      'and',
      '<',
      'today',
      'or',
      'starts with',
      'and',
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
