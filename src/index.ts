export { Comp } from './typings';

import * as React from 'react';

import contextMap from './context';
import doMap from './do';
import pureMap from './pure';
import yieldMap from './yield';

import { Comp } from './typings';
import { root } from './utils';

const wrap = base => {
  const chain = map => wrap(getComp => base(map(getComp)));
  let comp;
  return Object.assign(
    props => React.createElement(comp || (comp = base()()), props),
    {
      apply: hoc => chain(getComp => () => (hoc ? hoc(getComp()) : getComp())),
      context: (name, getContext) => chain(contextMap(name, getContext)),
      do: (...selectors) => chain(doMap(...selectors)),
      pure: (...args) => chain(pureMap(...args)),
      yield: (...selectors) => chain(yieldMap(...selectors)),
    },
  );
};

export default wrap((getComp = root) => getComp) as Comp<any>;