import ReactDOMServer from 'react-dom/server';

type MountProps<T extends Record<string, any>> = {
  $wrap: HTMLElement;
  values: T;
  onChange: (newValues: T) => void;
};
type A<T extends Record<string, any> = {}> = {
  onMount: (props: MountProps<T>) => void;
  html: string;
  default: T;
};
type AViewPayload = Omit<A, 'onMount'> & {
  onMount: string;
};

const a: A<{
  name: string;
  age: number;
}> = {
  default: {
    name: 'totoraj',
    age: 24,
  },
  onMount: ({ $wrap, onChange, values: _values }) => {
    const values = structuredClone(_values);
    const $name = $wrap.querySelector(
      'input[data-key=name]'
    ) as HTMLInputElement;
    const $age = $wrap.querySelector('input[data-key=age]') as HTMLInputElement;

    $name.value = values.name;
    $age.value = values.age + '';

    $name.addEventListener('change', () => handleChange('name'));
    $age.addEventListener('change', () => handleChange('age'));

    function handleChange(key: keyof typeof values) {
      switch (key) {
        case 'name': {
          values.name = $name.value;
          break;
        }
        case 'age': {
          const num = Number.parseInt($age.value);
          values.age = Number.isFinite(num) ? num : values.age;
        }
      }
      onChange(values);
    }
  },
  html: ReactDOMServer.renderToString(
    <>
      <h1>カスタムHTML</h1>
      <input type="text" data-key="name" value={'totoraj'} />
      <input type="number" data-key="age" value={10} />
    </>
  ),
};
