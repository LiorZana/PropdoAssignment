import { isEmptyObject, mapObject, mapObjectToValue } from '@/utils';
import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import * as yup from 'yup';

// handlechange, setValue, errors, validator,
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface FieldValidator<T extends yup.AnySchema> {
  // readonly validator: T;
  handleChange(e: ChangeEvent): void;
  setValue(value: yup.InferType<T>): void;
}

type ErrorHandler = (error: yup.ValidationError) => void;

class Field<T extends yup.AnySchema> implements FieldValidator<T> {
  constructor(private readonly validator: T, private onSuccess: () => void, private onError: ErrorHandler) {}
  public handleChange(e: ChangeEvent) {
    try {
      this.validator.validateSync(this.validator.cast(e.target.value));
    } catch (error) {
      this.onError(error as yup.ValidationError);
    }
  }
  public setValue(value: yup.Asserts<T>) {
    try {
      this.validator.validateSync(this.validator.cast(value));
    } catch (error) {
      this.onError(error as yup.ValidationError);
    }
  }
}

type ValidationObject = UTILS.GenericObject<yup.AnySchema>;
type ValidationErrors<T extends ValidationObject> = UTILS.MappedGenericObject<T, string | null>;
// type FieldValidators<T extends ValidationObject> = UTILS.MappedGenericObject<
//   T,
//   InstanceType<new () => FieldHandler<yup.AnySchema>>
// >;

// type UseValidationState<T extends ValidationObject> = { validators: FieldValidators<T>; errors: ValidationErrors<T> };
// type UseValidationAction<T extends ValidationObject> =
//   | { type: 'setValidators'; payload: FieldValidators<T> }
//   | { type: 'setValidatorsFromObject'; payload: T }
//   | { type: 'setErrors'; payload: ValidationErrors<T> }
//   | { type: 'setError'; payload: { name: keyof T; error: ValidationErrors<T> } };

// const useValidationInitialState = { validators: {}, errors: {} };

// const mapValidators = <T extends ValidationObject>(obj: T) => {
//   const validators: FieldValidators<T> = {} as FieldValidators<T>;
//   for (const name in obj) {
//     const scheme = obj[name];
//     validators[name] = new FieldHandler(scheme, name);
//   }
//   return validators;
// };

// const useValidationReducer = <T extends ValidationObject>(
//   state: UseValidationState<T>,
//   action: UseValidationAction<T>
// ): UseValidationState<T> => {
//   switch (action.type) {
//     case 'setValidators': {
//       return { ...state, validators: action.payload };
//     }
//     case 'setValidatorsFromObject': {
//       return { ...state, validators: mapValidators(action.payload) };
//     }
//     case 'setErrors': {
//       return { ...state, errors: action.payload };
//     }
//     case 'setError': {
//       const { name, error } = action.payload;
//       return { ...state, errors: { ...state.errors, [name]: error } };
//     }
//     default:
//       return state;
//   }
// };

const useFieldValidation = <T extends ValidationObject>(fields: T) => {
  const [errors, setErrors] = useState<ValidationErrors<T>>(mapObjectToValue(fields, null));
  const getHandlers = useCallback(
    (key: string | number | symbol) => ({
      HandleSuccess() {
        setErrors(err => ({ ...err, [key]: null }));
      },
      HandleError(error: yup.ValidationError) {
        setErrors(err => ({ ...err, [key]: error }));
      }
    }),
    []
  );
  const validators = useRef(
    mapObject(fields, (key, value) => {
      const factory = getHandlers(key);
      return new Field(value, factory.HandleSuccess, factory.HandleSuccess);
    })
  );
  // const initValidators = useRef(mapValidators(fields));
  // const [state, dispatch] = useReducer(useValidationReducer, { errors: {}, validators: initValidators.current });
  return { fields: validators.current, errors };
};

export default useFieldValidation;
