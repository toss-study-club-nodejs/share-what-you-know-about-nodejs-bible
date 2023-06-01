// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {defaultMetadataStorage} from 'class-transformer/cjs/storage';
import {Exclude, Expose} from 'class-transformer';

export function ResponseDto() {
  return function (target: any) {
    Exclude()(target.prototype);

    const properties = Object.getOwnPropertyNames(target.prototype);

    properties
      .filter(
        (key) =>
          isGetter(target.prototype, key) &&
          !defaultMetadataStorage.findExposeMetadata(target, key),
      )
      .forEach((key) => Expose()(target.prototype, key));
  };

  function isGetter(prototype: any, key: string): boolean {
    return !!Object.getOwnPropertyDescriptor(prototype, key)?.get;
  }
}
