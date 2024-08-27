import {
  PluginFieldValues,
  PluginStaticFields,
} from '@virtu-button/common/Plugin';
import { BooleanFieldInput } from './input/boolean';
import { KeyCombinationFieldInput } from './input/keyCombination';
import { NumberFieldInput } from './input/number';
import { SelectFieldInput } from './input/select';
import { StringFieldInput } from './input/string';
import { TextFieldInput } from './input/text';

type Props = {
  fields: PluginStaticFields;
  values: PluginFieldValues;
  onChange?: (props: PluginFieldValues) => void;
};
export function PluginFieldsEditor({ fields, values, onChange }: Props) {
  return Object.keys(fields)
    .sort()
    .map((key) => {
      const prop = fields[key];
      let Elm: React.ReactNode;
      const value = values[key] ?? prop.default;
      switch (prop.type) {
        case 'string': {
          Elm = (
            <StringFieldInput
              key={key}
              prop={prop}
              value={value}
              onChange={(v) => {
                onChange?.({ ...values, [key]: v });
              }}
            />
          );
          break;
        }
        case 'text': {
          Elm = (
            <TextFieldInput
              key={key}
              prop={prop}
              value={value}
              onChange={(v) => {
                onChange?.({ ...values, [key]: v });
              }}
            />
          );
          break;
        }
        case 'number': {
          Elm = (
            <NumberFieldInput
              key={key}
              prop={prop}
              value={value}
              onChange={(v) => {
                onChange?.({ ...values, [key]: v });
              }}
            />
          );
          break;
        }
        case 'boolean': {
          Elm = (
            <BooleanFieldInput
              key={key}
              prop={prop}
              value={value}
              onChange={(v) => {
                onChange?.({ ...values, [key]: v });
              }}
            />
          );
          break;
        }
        case 'select': {
          Elm = (
            <SelectFieldInput
              key={key}
              prop={prop}
              value={value}
              onChange={(v) => {
                onChange?.({ ...values, [key]: v });
              }}
            />
          );
          break;
        }
        case 'keyCombination': {
          Elm = (
            <KeyCombinationFieldInput
              key={key}
              prop={prop}
              value={value}
              onChange={(v) => {
                onChange?.({ ...values, [key]: v });
              }}
            />
          );
          break;
        }
      }
      return Elm;
    });
}
