import { useReducer, useState } from 'react';
import { Sub } from '../types';

interface FormState {
  inputValues: Sub;
}

interface FormProps {
  // onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>;
  onNewSub: (newSub: Sub) => void;
}

const INITIAL_STATE = {
  nick: '',
  subMonths: 0,
  avatar: '',
  description: '',
};

type FormReducerAction =
  | {
      type: 'change_value';
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: 'clear';
    };

const formReducer = (
  state: FormState['inputValues'],
  action: FormReducerAction
) => {
  switch (action.type) {
    case 'change_value':
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        [inputName]: inputValue,
      };
    case 'clear':
      return INITIAL_STATE;
    default:
      return state;
  }
};

const Form = ({ onNewSub }: FormProps) => {
  // const [inputValues, setInputValues] =
  //   useState<FormState['inputValues']>(INITIAL_STATE);
  const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onNewSub(subs => ([...subs, inputValues]))
    onNewSub(inputValues);
    handleClear();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: 'change_value',
      payload: {
        inputName: name,
        inputValue: value,
      },
    });

    // setInputValues({
    //   ...inputValues,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleClear = () => {
    dispatch({ type: 'clear' });
    // setInputValues(INITIAL_STATE);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={inputValues.nick}
          type="text"
          name="nick"
          placeholder="nick"
        />
        <input
          onChange={handleChange}
          value={inputValues.subMonths}
          type="text"
          name="subMonths"
          placeholder="subMonths"
        />
        <input
          onChange={handleChange}
          value={inputValues.avatar}
          type="text"
          name="avatar"
          placeholder="avatar"
        />
        <textarea
          onChange={handleChange}
          value={inputValues.description}
          name="description"
          placeholder="description"
        />
        <button onClick={handleClear} type="button">
          Clear the form
        </button>
        <button type="submit">Save new sub!</button>
      </form>
    </div>
  );
};

export default Form;
