import { Action } from 'redux';

type ObjValuesType<Obj> = Obj extends { [key: string]: infer U } ? U : never;

type ActionType = {
  [key: string]: (...args: any) => Action<string>;
};

type ActionsType<Obj extends ActionType> = ReturnType<ObjValuesType<Obj>>;

export default ActionsType;
