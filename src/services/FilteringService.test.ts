import React from 'react';
import { datastore } from '../mocks/data';
import { filter } from './FilteringService';

const products = datastore.getProducts();
const properties = datastore.getProperties();
const operators = datastore.getOperators();

describe('FilteringService', () => {
  test('equals (string)', () => {
    const value = 'black';
    const property = properties[1]; //color
    const operator = operators[0]; //equals
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(2);
  });

  test('equals (number)', () => {
    const value = '3';
    const property = properties[2]; //weight
    const operator = operators[0]; //equals
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(2);
  });

  test('equals (array)', () => {
    const value = ['true'];
    const property = properties[4]; //wireless
    const operator = operators[0]; //equals
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(1);
  });

  test('any (string)', () => {
    const property = properties[1]; //color
    const operator = operators[3]; //any
    const result = filter(products, property, operator);
    expect(result.length).toBe(6);
  });

  test('any (number)', () => {
    const property = properties[2]; //weight
    const operator = operators[3]; //any
    const result = filter(products, property, operator);
    expect(result.length).toBe(6);
  });

  test('any (array)', () => {
    const property = properties[4]; //wireless
    const operator = operators[3]; //any
    const result = filter(products, property, operator);
    expect(result.length).toBe(3);
  });

  test('none (string)', () => {
    const property = properties[1]; //color
    const operator = operators[4]; //none
    const result = filter(products, property, operator);
    expect(result.length).toBe(0);
  });

  test('none (number)', () => {
    const property = properties[2]; //weight
    const operator = operators[4]; //none
    const result = filter(products, property, operator);
    expect(result.length).toBe(0);
  });

  test('none (array)', () => {
    const property = properties[4]; //wireless
    const operator = operators[4]; //none
    const result = filter(products, property, operator);
    expect(result.length).toBe(3);
  });

  test('greater_than (number)', () => {
    const value = 3;
    const property = properties[2]; //weight
    const operator = operators[1]; //greater_than
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(3);
  });

  test('less_than (number)', () => {
    const value = 3;
    const property = properties[2]; //weight
    const operator = operators[2]; //less_than
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(1);
  });

  test('in (string)', () => {
    const value = 'black white';
    const property = properties[1]; //color
    const operator = operators[5]; //in
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(3);
  });

  test('in (number)', () => {
    const value = '3 1';
    const property = properties[2]; //weight
    const operator = operators[5]; //in
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(3);
  });

  test('in (array)', () => {
    const value = 'true false';
    const property = properties[4]; //wireless
    const operator = operators[5]; //in
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(3);
  });

  test('contains (string)', () => {
    const value = 'b';
    const property = properties[1]; //color
    const operator = operators[6]; //contains
    const result = filter(products, property, operator, value);
    expect(result.length).toBe(3);
  });

});
