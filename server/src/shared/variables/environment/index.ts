import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

import { EnvironmentType } from './types';

import { EnvironmentSchema } from './schemas/environment.schema';
import { ValidationService } from 'src/shared/validation/validation.service';

const expanded = expand(config()).parsed;

export const Environment = ValidationService.validateWithZod(
  EnvironmentSchema,
  expanded,
) as EnvironmentType;
