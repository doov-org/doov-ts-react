import * as React from 'react';
import * as DOOV from 'doov';
import { Model, User } from './model';
import { render } from '@testing-library/react';
import { GetHtml } from '../src/doov-react';
import { SingleValidationRule } from 'doov';
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

let doc: HTMLElement;
let rule: SingleValidationRule;

let model = new Model();
let user = new User(0);
user.name = 'Bob';
user.links = ['some string', 'other string'];
user.b = false;
model.user = user;

const zeroField = DOOV.number(DOOV.field('user', 'id'));
const nameField = DOOV.string(DOOV.field('user', 'name'));
const dateField = DOOV.date(DOOV.field('user', 'birth'));
const boolField = DOOV.boolean(DOOV.field('user', 'b'));

const getTextArray = (elt: Element) => elt.textContent;

describe('more combined tests', () => {
  it('or and sum', () => {
    rule = DOOV.when(
      dateField
        .ageAt(dateField)
        .greaterOrEquals(0)
        .or(dateField.ageAt(dateField).greaterOrEquals(0))
        .and(DOOV.sum(zeroField, zeroField).lesserThan(0))
    ).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(2);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'age at',
      '>=',
      'or',
      'age at',
      '>=',
      'and',
      '<',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.birth',
      'user.birth',
      'user.birth',
      'user.birth',
      'user.id',
      'user.id',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['0', '0', '0']);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['sum']);
  });
  it('and and and match any and and', () => {
    rule = DOOV.when(
      nameField
        .eq('Bob')
        .and(boolField.eq(false))
        .and(DOOV.matchAny(boolField.eq(true), boolField.not().and(zeroField.between(0, 1))))
        .and(zeroField.eq(1))
    ).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(3);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      '=',
      'and',
      '=',
      'and',
      '=',
      'not',
      'and',
      '>=',
      'and',
      '<',
      'and',
      '=',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.name',
      'user.b',
      'user.b',
      'user.b',
      'user.id',
      'user.id',
      'user.id',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual([
      '"Bob"',
      'false',
      'true',
      '0',
      '1',
      '1',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).map(getTextArray)).toEqual(['match any']);
  });
  it('or and and and', () => {
    rule = DOOV.when(
      zeroField
        .isNull()
        .or(zeroField.eq(0))
        .and(boolField.eq(false))
        .and(
          dateField
            .ageAt(dateField)
            .lesserThan(0)
            .and(dateField.ageAt(dateField).greaterOrEquals(0))
        )
    ).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute(model).value).toEqual(false);
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'is null',
      'or',
      '=',
      'and',
      '=',
      'and',
      'age at',
      '<',
      'and',
      'age at',
      '>=',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.id',
      'user.id',
      'user.b',
      'user.birth',
      'user.birth',
      'user.birth',
      'user.birth',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['0', 'false', '0', '0']);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('date', () => {
    rule = DOOV.when(
      DOOV.DateFunction.today()
        .minusDays(2)
        .before(DOOV.DateFunction.tomorrow())
    ).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
});
