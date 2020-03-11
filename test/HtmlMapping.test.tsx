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
import TOKEN_WHEN_SPAN = HtmlSelector.TOKEN_WHEN_SPAN;
import TOKEN_THEN_SPAN = HtmlSelector.TOKEN_THEN_SPAN;
import TOKEN_ELSE_SPAN = HtmlSelector.TOKEN_ELSE_SPAN;
import TOKEN_SINGLE_MAPPING_SPAN = HtmlSelector.TOKEN_SINGLE_MAPPING_SPAN;
import { biConverter, converter, map, mappings, when, MappingRule } from 'doov';

let doc: HTMLElement;
let rule: MappingRule;

const dateValue = new Date(2000, 0, 1);
const dateString = JSON.stringify(dateValue);

let model = new Model();
let user = new User(0);
user.name = 'Bob';
user.name2 = 'Alice';
user.birth = dateValue;
user.today = new Date(2019, 0, 1);
user.b = false;
model.user = user;

const intField = DOOV.number(DOOV.field<number, Model>('user', 'id'));
const boolField = DOOV.boolean(DOOV.field<boolean, Model>('user', 'b'));
const dateField = DOOV.date(DOOV.field<Date, Model>('user', 'birth'));
const dateField2 = DOOV.date(DOOV.field<Date, Model>('user', 'today'));
const stringField = DOOV.string(DOOV.field<string, Model>('user', 'name'));
const stringField2 = DOOV.string(DOOV.field<string, Model>('user', 'name2'));
/*const linkField0 = DOOV.string(DOOV.field<string, Model>('user', 'links', 0));
const linkField1 = DOOV.string(DOOV.field<string, Model>('user', 'links', 1));*/

const getTextArray = (elt: Element) => elt.textContent;

describe('test du mapping', () => {
  it('map to int field ', () => {
    rule = map(18).to(intField);
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(1);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['map', 'to']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['18']);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.id']);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('map to boolean field ', () => {
    rule = map(true).to(boolField);
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(1);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['map', 'to']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['true']);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.b']);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('map to date field ', () => {
    rule = map(dateValue).to(dateField);
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(1);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['map', 'to']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual([dateString]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.birth']);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('mappings to int field boolean field and date field', () => {
    rule = mappings(map(18).to(intField), map(true).to(boolField), map(dateValue).to(dateField));
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(3);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(3);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'map',
      'to',
      'map',
      'to',
      'map',
      'to',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['18', 'true', dateString]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.id',
      'user.b',
      'user.birth',
    ]);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('mapping date to stringfield with converter', () => {
    rule = map(dateValue)
      .using(converter(d => d.toString(), 'date to string'))
      .to(stringField);
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(1);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual(['map', 'using', 'to']);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual([
      dateString,
      "'date to string'",
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual(['user.name']);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('mapping 2 stringfields to stringfield2 with converter', () => {
    rule = map(stringField, stringField2)
      .using(biConverter((s1, s2) => s1 + ' ' + s2, 'combine names'))
      .to(stringField2);
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(1);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'map',
      'and',
      'using',
      'to',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(["'combine names'"]);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.name',
      'user.name2',
      'user.name2',
    ]);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('conditional mapping to booleanField', () => {
    rule = when(dateField.ageAt(dateField2).greaterOrEquals(18))
      .then(map(true).to(boolField))
      .otherwise(map(false).to(boolField));
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(1);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(1);
    expect(doc.querySelectorAll(TOKEN_ELSE_SPAN).length).toEqual(1);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(2);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'age at',
      '>=',
      'map',
      'to',
      'map',
      'to',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['18', 'true', 'false']);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.birth',
      'user.today',
      'user.b',
      'user.b',
    ]);
    expect(doc.querySelectorAll(TOKEN_NARY_SPAN).length).toEqual(0);
  });
  it('conditional multiple mapping to booleanField', () => {
    rule = when(dateField.ageAt(dateField2).greaterOrEquals(18)).then(
      mappings(map(true).to(boolField), map(true).to(boolField))
    );
    doc = render(<DoovReact metadata={rule.metadata} />).container;
    expect(doc.querySelectorAll(NARY_OL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARY_LI).length).toEqual(0);
    expect(doc.querySelectorAll(NARY_LI).length).toEqual(2);
    expect(doc.querySelectorAll(LEAF_LI).length).toEqual(0);
    expect(doc.querySelectorAll(WHEN_UL).length).toEqual(1);
    expect(doc.querySelectorAll(BINARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(BINARYCHILD_UL).length).toEqual(0);
    expect(doc.querySelectorAll(UNARY_UL).length).toEqual(0);
    expect(doc.querySelectorAll(TOKEN_WHEN_SPAN).length).toEqual(1);
    expect(doc.querySelectorAll(TOKEN_THEN_SPAN).length).toEqual(1);
    expect(doc.querySelectorAll(TOKEN_SINGLE_MAPPING_SPAN).length).toEqual(2);
    expect(Array.from(doc.querySelectorAll(TOKEN_OPERATOR_SPAN)).map(getTextArray)).toEqual([
      'age at',
      '>=',
      'map',
      'to',
      'map',
      'to',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_VALUE_SPAN)).map(getTextArray)).toEqual(['18', 'true', 'true']);
    expect(Array.from(doc.querySelectorAll(TOKEN_FIELD_SPAN)).map(getTextArray)).toEqual([
      'user.birth',
      'user.today',
      'user.b',
      'user.b',
    ]);
    expect(Array.from(doc.querySelectorAll(TOKEN_NARY_SPAN)).length).toEqual(0);
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
});
