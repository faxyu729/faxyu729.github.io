import { test } from 'node:test'
import assert from 'node:assert/strict'
import { clamp, mapRange, getScrollProgress } from './motion.js'

test('clamp：值在範圍內，原樣回傳', () => {
  assert.equal(clamp(5, 0, 10), 5)
})

test('clamp：值低於最小值，回傳最小值', () => {
  assert.equal(clamp(-1, 0, 10), 0)
})

test('clamp：值高於最大值，回傳最大值', () => {
  assert.equal(clamp(15, 0, 10), 10)
})

test('clamp：min 等於 max，回傳該值', () => {
  assert.equal(clamp(5, 3, 3), 3)
})

test('mapRange：正向映射', () => {
  assert.equal(mapRange(50, 0, 100, 0, 1), 0.5)
})

test('mapRange：邊界值（起點）', () => {
  assert.equal(mapRange(0, 0, 100, 0, 1), 0)
})

test('mapRange：邊界值（終點）', () => {
  assert.equal(mapRange(100, 0, 100, 0, 1), 1)
})

test('mapRange：反向映射', () => {
  assert.equal(mapRange(50, 100, 0, 0, 1), 0.5)
})

test('getScrollProgress：捲動位於頂部，回傳 0', () => {
  assert.equal(getScrollProgress(0, 2000, 800), 0)
})

test('getScrollProgress：捲動位於底部，回傳 1', () => {
  assert.equal(getScrollProgress(1200, 2000, 800), 1)
})

test('getScrollProgress：中間位置，回傳 0.5', () => {
  assert.equal(getScrollProgress(600, 2000, 800), 0.5)
})
