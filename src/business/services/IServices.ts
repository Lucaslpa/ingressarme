import { Notifier } from '@EntityNotifier';
import { IServiceError } from './IServiceError';
import { Injectable } from '@nestjs/common';

export abstract class IServices<T extends Notifier> {
  abstract add(entity: T): Promise<T>;
  abstract update(entity: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
