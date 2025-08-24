import { test, expect } from 'vitest';
import reducer, { updateControlledForm, updateUncontrolledForm } from '../form';
import type { UnknownAction } from '@reduxjs/toolkit';

test('check initialState returned when action is unknown', () => {
  const unknown: UnknownAction = { type: 'unknown' };
  const next = reducer(undefined, unknown);

  expect(next).toEqual({ controlled: null, uncontrolled: null });
});

test('check updateControlledForm action', () => {
  const prev = { controlled: null, uncontrolled: null };

  const payload = {
    fname: 'Ksenia',
    age: 30,
    email: 'k@example.com',
    password: 'Aa1!aaaa',
    passwordRepeat: 'Aa1!aaaa',
    gender: 'female',
    file: 'data:image/png;base64,AAA',
  };

  const next = reducer(prev, updateControlledForm(payload));

  expect(next.controlled).toEqual(payload);
  expect(next.uncontrolled).toBeNull();
  expect(next).not.toBe(prev);
});

test('check updateUncontrolledForm action', () => {
  const prev = { controlled: null, uncontrolled: null };

  const payload = {
    fname: 'Kate',
    age: 28,
    email: 'kate@example.com',
    password: 'Bb2!bbbb',
    passwordRepeat: 'Bb2!bbbb',
    gender: 'female',
    checkbox: 'on',
    file: 'data:image/png;base64,BBB',
  };

  const next = reducer(prev, updateUncontrolledForm(payload));

  expect(next.uncontrolled).toEqual(payload);
  expect(next.controlled).toBeNull();
  expect(next).not.toBe(prev);
});
