import { setupServer } from 'msw/node';

import { app } from './app';
import { carbon } from './carbon';
import { electricity } from './electricity';
import { overall } from './overview';
import { renewableEnergy } from './renewableEnergy';
import { summary } from './summary';
import { unitElectricity } from './unitElectricity';
import { waste } from './waste';
import { water } from './water';

const server = setupServer(
  ...app,
  ...carbon,
  ...summary,
  ...overall,
  ...renewableEnergy,
  ...electricity,
  ...water,
  ...unitElectricity,
  ...waste
);

export { server };
