declare namespace UTILS {
  type ColorMode = 'light' | 'dark';
  type ArrayMember<T> = T extends Array<infer M> ? M : T;
  type Range = { min: number; max: number };
  type RangeTuple = [min: number, max: number];
  type CSSUnit =
    | 'cm'
    | 'mm'
    | 'Q'
    | 'in'
    | 'pc'
    | 'pt'
    | 'px'
    | 'em'
    | 'ex'
    | 'ch'
    | 'rem'
    | 'em'
    | 'lh'
    | 'vw'
    | 'vh'
    | 'vmin'
    | 'vmax'
    | '%';
  type GenericObject<Values = any> = { [key: string]: Values };
  type MappedObject<KeyMap extends string, Values extends any> = { [key in KeyMap]: Values };
  type MappedGenericObject<Keys extends GenericObject, Values extends any> = { [key in keyof Keys]: Values };
  type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P];
  };
  type DynamicImportPromiseType<Props extends any> = Promise<{ default: React.ComponentType<Props> }>;
  type DynamicImportType<Props extends any> = () => DynamicImportPromiseType<Props>;
}
