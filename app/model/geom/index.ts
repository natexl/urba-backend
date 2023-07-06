import db from '@/utils/database';

const getGeomByBounds = async (bounds: number[]): Promise<any[]> => {
    const query = `
      SELECT row_to_json(fc)
      FROM (
        SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
        FROM (
          SELECT 'Feature' as type,
            ST_AsGeoJSON(ST_Transform(geom, 4326))::json as geometry,
            row_to_json((SELECT l FROM (SELECT id, name) as l)) as properties
          FROM your_table_name
          WHERE ST_Transform(geom, 4326) && ST_MakeEnvelope($1, $2, $3, $4, 4326)
        ) as f
      ) as fc;
    `;
  const res = await db.query(query, bounds);
  return res.rows
};


export {
  getGeomByBounds,
};