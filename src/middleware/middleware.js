
import { Sequelize } from "sequelize";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof Sequelize.ValidationError) {
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }

  return res.status(500).json({ error: 'Internal server error' });
};
