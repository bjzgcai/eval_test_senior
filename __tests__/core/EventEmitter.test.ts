/**
 * EventEmitter tests
 */

import { EventEmitter } from '../../src/core/EventEmitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test('should register and emit events', () => {
    const handler = jest.fn();
    emitter.on('test', handler);
    emitter.emit('test', { data: 'test' });
    expect(handler).toHaveBeenCalledWith({ data: 'test' });
  });

  test('should remove event listeners', () => {
    const handler = jest.fn();
    emitter.on('test', handler);
    emitter.off('test', handler);
    emitter.emit('test');
    expect(handler).not.toHaveBeenCalled();
  });

  test('should support once listeners', () => {
    const handler = jest.fn();
    emitter.once('test', handler);
    emitter.emit('test');
    emitter.emit('test');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('should get listener count', () => {
    const handler = jest.fn();
    emitter.on('test', handler);
    expect(emitter.listenerCount('test')).toBe(1);
  });
});
