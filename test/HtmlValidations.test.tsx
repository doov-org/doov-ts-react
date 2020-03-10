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
import { ValidationRule, when, BooleanFunction } from 'doov';
import { render } from '@testing-library/react';
import * as React from 'react';
import * as DOOV from 'doov';

let A, B: BooleanFunction;
let doc: HTMLElement;
let rule: ValidationRule;

const bobField = DOOV.string(DOOV.field('user', 'name'));
const link0 = DOOV.string(DOOV.field('user', 'links', 0));

const getTextArray = (elt: Element) => elt.textContent;

describe('tests of validations', () => {
  it('validations when false when false', () => {
    A = DOOV.lift(BooleanFunction, false);
    B = DOOV.lift(BooleanFunction, false);
    rule = DOOV.validations(when(A).validate(), when(B).validate());
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(2);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['false', 'false']);
    expect(doc.querySelectorAll('div').length).toEqual(2);
  });
  it('validations complex', () => {
    rule = DOOV.validations(
      DOOV.when(bobField.startsWith('B')).validate(),
      DOOV.when(link0.isDefined().and(bobField.contains('Bob'))).validate()
    );
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(1);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(2);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'starts with',
      'is defined',
      'and',
      'contains',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.name',
      'user.links.0',
      'user.name',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['"B"', '"Bob"']);
    expect(doc.querySelectorAll('div').length).toEqual(2);
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
});
