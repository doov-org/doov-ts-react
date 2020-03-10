import * as React from 'react';
import * as DOOV from 'doov';
import { Model, User } from './model';
import { render } from '@testing-library/react';
import { GetHtml } from '../src/doov-react';
import { BooleanFunction, SingleValidationRule } from 'doov';
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

let A, B, C: BooleanFunction;
let doc: HTMLElement;
let rule: SingleValidationRule;

let model = new Model();
let user = new User(0);
user.links = ['some string', 'other string'];
model.user = user;

const zeroField = DOOV.number(DOOV.field('user', 'id'));
const links = DOOV.iterable(DOOV.field<string[], Model>('user', 'links'));
const stringField1 = DOOV.string(DOOV.field<string, Model>('user', 'links', 0));
const stringField2 = DOOV.string(DOOV.field<string, Model>('user', 'links', 1));

const getTextArray = (elt: Element) => elt.textContent;

describe('combined tests', () => {
  it('reduce matchAll', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, false);
    C = DOOV.lift(BooleanFunction, false);
    rule = DOOV.when(DOOV.matchAll(A, B, C)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
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
  it('reduce and', () => {
    A = DOOV.lift(BooleanFunction, true);
    B = DOOV.lift(BooleanFunction, false);
    rule = DOOV.when(A.and(B)).validate() as SingleValidationRule;
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
  it('reduce zeroInt', () => {
    rule = DOOV.when(zeroField.notEq(0)).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.id']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['0']);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['!=']);
  });
  it('reduce links', () => {
    rule = DOOV.when(links.contains('c')).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.links']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['"c"']);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['contains']);
  });
  it('reduce undefined', () => {
    A = DOOV.date(DOOV.field('user', 'birth'));
    rule = DOOV.when(A.isUndefined()).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(true);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.birth']);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['is undefined']);
  });
  it('matches regexp', () => {
    A = DOOV.date(DOOV.field('user', 'birth'));
    rule = DOOV.when(
      stringField1.matches('^some.*').or(stringField2.matches('^other.*'))
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
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.links.0',
      'user.links.1',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['"^some.*"', '"^other.*"']);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'matches',
      'or',
      'matches',
    ]);
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
});
