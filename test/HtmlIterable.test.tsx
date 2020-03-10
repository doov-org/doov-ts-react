import * as React from 'react';
import * as DOOV from 'doov';
import { render } from '@testing-library/react';
import { Model, User } from './model';
import { GetHtml } from '../src/doov-react';
import { HtmlSelector } from './HtmlSelector';
import ITERABLE_UL = HtmlSelector.ITERABLE_UL;
import { MappingRule, SingleValidationRule, StringFunction } from 'doov';

let doc: HTMLElement;
let rule: MappingRule;

let model = new Model();
let user = new User(0);
user.links = [];
model.user = user;

const iterField = DOOV.iterable(DOOV.field<string[], Model>('user', 'links'));
const someValue = DOOV.lift(StringFunction, 'gmail.com');

const getTextArray = (elt: Element) => elt.textContent;
const getTextAtIndex = (elt: Element, index: number) => elt.querySelectorAll('li').item(index).textContent;

describe('tests of iterable', () => {
  it('mapping iterable value', () => {
    rule = DOOV.map(['google.com', 'yahoo.fr']).to(iterField);
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(Array.from(doc.querySelectorAll(ITERABLE_UL)).map(getTextArray)).toContain('"google.com""yahoo.fr"');
    expect(Array.from(doc.querySelectorAll(ITERABLE_UL)).map(elt => getTextAtIndex(elt, 0))).toContain('"google.com"');
    expect(Array.from(doc.querySelectorAll(ITERABLE_UL)).map(elt => getTextAtIndex(elt, 1))).toContain('"yahoo.fr"');
  });
  it('iterableFunction with noneMatch', () => {
    const rule = DOOV.when(someValue.noneMatch('google.com', 'yahoo.fr')).validate() as SingleValidationRule;
    doc = render(<GetHtml metadata={rule.metadata} />).container;
    expect(rule.execute().value).toEqual(true);
    expect(Array.from(doc.querySelectorAll(ITERABLE_UL)).map(getTextArray)).toContain('"google.com""yahoo.fr"');
    expect(Array.from(doc.querySelectorAll(ITERABLE_UL)).map(elt => getTextAtIndex(elt, 0))).toContain('"google.com"');
    expect(Array.from(doc.querySelectorAll(ITERABLE_UL)).map(elt => getTextAtIndex(elt, 1))).toContain('"yahoo.fr"');
  });
});

afterEach(() => {
  console.log(rule.metadata.readable);
});
