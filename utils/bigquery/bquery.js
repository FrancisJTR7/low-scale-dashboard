const bigquery = require('./client');

async function fetchData(tableIdentifier) {
  const query = `SELECT * FROM \`analytics.pacing__${tableIdentifier}\` LIMIT 1`;

  const kpiQuery = `
  WITH base AS (
    SELECT
      FORMAT_DATE('%Y-%m', PARSE_DATE('%m/%d/%y', t.day)) AS month,
      PARSE_DATE('%m/%d/%y', t.day) AS date,
      p.total_spend,
      p.new_orders,
      p.new_revenue,
      p.return_orders,
      p.return_revenue,
      CAST(t.spend AS NUMERIC) AS target_spend,
      CAST(t.new_orders AS NUMERIC) AS target_new_orders,
      CAST(t.new_revenue AS NUMERIC) AS target_new_revenue,
      CAST(t.return_orders AS NUMERIC) AS target_return_orders,
      CAST(t.return_revenue AS NUMERIC) AS target_return_revenue
    FROM 
      \`analytics.pacing__${tableIdentifier}\` p 
    LEFT JOIN
      \`google_sheets__${tableIdentifier}.projections\` t
      ON PARSE_DATE('%m/%d/%y', t.day) = DATE(p.date)
  ),
  dailypacing AS (
    SELECT
      month,
      date,
      ROUND(SUM(total_spend), 2) AS actual_spend,
      SUM(new_orders) AS actual_new_orders,
      SUM(new_revenue) AS actual_new_revenue,
      SUM(return_orders) AS actual_return_orders,
      SUM(return_revenue) AS actual_return_revenue,
      SUM(new_orders) + SUM(return_orders) AS actual_total_orders,
      SUM(new_revenue) + SUM(return_revenue) AS actual_total_revenue,
      SUM(target_spend) AS target_spend,
      SUM(target_new_orders) AS target_new_orders,
      SUM(target_new_revenue) AS target_new_revenue,
      SUM(target_return_orders) AS target_return_orders,
      SUM(target_return_revenue) AS target_return_revenue,
      SUM(target_new_orders) + SUM(target_return_orders) AS target_total_orders,
      SUM(target_new_revenue) + SUM(target_return_revenue) AS target_total_revenue,
      CASE
        WHEN SUM(target_spend) = 0 THEN 0
        ELSE (SUM(total_spend) - SUM(target_spend)) / SUM(target_spend)
      END AS daily_delta_spend,
      CASE
        WHEN SUM(target_new_orders) = 0 THEN 0
        ELSE (SUM(new_orders) - SUM(target_new_orders)) / SUM(target_new_orders)
      END AS daily_delta_new_orders,
      CASE
        WHEN SUM(target_new_revenue) = 0 THEN 0
        ELSE (SUM(new_revenue) - SUM(target_new_revenue)) / SUM(target_new_revenue)
      END AS daily_delta_new_revenue,
      CASE
        WHEN SUM(target_return_orders) = 0 THEN 0
        ELSE (SUM(return_orders) - SUM(target_return_orders)) / SUM(target_return_orders)
      END AS daily_delta_return_orders,
      CASE
        WHEN SUM(target_return_revenue) = 0 THEN 0
        ELSE (SUM(return_revenue) - SUM(target_return_revenue)) / SUM(target_return_revenue)
      END AS daily_delta_return_revenue
    FROM
      base
    WHERE
      date >= '2023-01-01'
    GROUP BY
      1, 2
    ORDER BY
      2
  ),
  runningtotals AS (
    SELECT
      month,
      date,
      actual_spend,
      actual_new_orders,
      actual_new_revenue,
      actual_return_orders,
      actual_return_revenue,
      actual_total_orders,
      actual_total_revenue,
      target_spend,
      target_new_orders,
      target_new_revenue,
      target_return_orders,
      target_return_revenue,
      target_total_orders,
      target_total_revenue,
      SUM(actual_spend) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_spend,
      SUM(actual_new_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_new_orders,
      SUM(actual_new_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_new_revenue,
      SUM(actual_return_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_return_orders,
      SUM(actual_return_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_return_revenue,
      SUM(actual_total_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_total_orders,
      SUM(actual_total_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_total_revenue,
      SUM(target_spend) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_spend,
      SUM(target_new_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_new_orders,
      SUM(target_new_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_new_revenue,
      SUM(target_return_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_return_orders,
      SUM(target_return_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_return_revenue,
      SUM(target_total_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_total_orders,
      SUM(target_total_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_total_revenue,
      SUM(actual_spend) OVER () AS aggregate_actual_spend,
      SUM(actual_new_orders) OVER () AS aggregate_actual_new_orders,
      SUM(actual_new_revenue) OVER () AS aggregate_actual_new_revenue,
      SUM(actual_return_orders) OVER () AS aggregate_actual_return_orders,
      SUM(actual_return_revenue) OVER () AS aggregate_actual_return_revenue,
      SUM(actual_total_orders) OVER () AS aggregate_actual_total_orders,
      SUM(actual_total_revenue) OVER () AS aggregate_actual_total_revenue,
      SUM(target_spend) OVER () AS aggregate_target_spend,
      SUM(target_new_orders) OVER () AS aggregate_target_new_orders,
      SUM(target_new_revenue) OVER () AS aggregate_target_new_revenue,
      SUM(target_return_orders) OVER () AS aggregate_target_return_orders,
      SUM(target_return_revenue) OVER () AS aggregate_target_return_revenue,
      SUM(target_total_orders) OVER () AS aggregate_target_total_orders,
      SUM(target_total_revenue) OVER () AS aggregate_target_total_revenue
    FROM
      dailypacing
    WHERE
      date >= '2024-07-01' and date <= '2024-07-31'
    GROUP BY
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
  )
  SELECT
    month,
    date,
    actual_spend,
    actual_new_orders,
    actual_new_revenue,
    actual_return_orders,
    actual_return_revenue,
    actual_total_orders,
    actual_total_revenue,
    target_spend,
    target_new_orders,
    target_new_revenue,
    target_return_orders,
    target_return_revenue,
    target_total_orders,
    target_total_revenue,
    running_total_actual_spend,
    running_total_actual_new_orders,
    running_total_actual_new_revenue,
    running_total_actual_return_orders,
    running_total_actual_return_revenue,
    running_total_actual_total_orders,
    running_total_actual_total_revenue,
    running_total_target_spend,
    running_total_target_new_orders,
    running_total_target_new_revenue,
    running_total_target_return_orders,
    running_total_target_return_revenue,
    running_total_target_total_orders,
    running_total_target_total_revenue,
    CASE 
      WHEN running_total_target_spend = 0 THEN 0
      ELSE (running_total_actual_spend - running_total_target_spend) / running_total_target_spend 
    END AS delta_running_total_spend,
    CASE 
      WHEN running_total_target_new_revenue = 0 THEN 0
      ELSE (running_total_actual_new_revenue - running_total_target_new_revenue) / running_total_target_new_revenue 
    END AS delta_running_new_revenue,
    CASE 
      WHEN running_total_target_new_orders = 0 THEN 0
      WHEN running_total_target_spend = 0 THEN 0
      WHEN running_total_actual_new_orders = 0 THEN 0
      ELSE ((running_total_actual_spend / running_total_actual_new_orders) - (running_total_target_spend / running_total_target_new_orders)) / (running_total_target_spend / running_total_target_new_orders)
    END AS delta_running_cac,
    CASE 
      WHEN running_total_target_return_revenue = 0 THEN 0
      ELSE (running_total_actual_return_revenue - running_total_target_return_revenue) / running_total_target_return_revenue 
    END AS delta_running_return_revenue,
    CASE 
      WHEN running_total_target_total_revenue = 0 THEN 0
      ELSE (running_total_actual_total_revenue - running_total_target_total_revenue) / running_total_target_total_revenue 
    END AS delta_running_total_revenue,
    CASE 
      WHEN running_total_target_total_orders = 0 THEN 0
      WHEN running_total_target_spend = 0 THEN 0
      WHEN running_total_actual_total_orders = 0 THEN 0
      ELSE ((running_total_actual_spend / running_total_actual_total_orders) - (running_total_target_spend / running_total_target_total_orders)) / (running_total_target_spend / running_total_target_total_orders)
    END AS delta_running_cpo,
    CASE 
      WHEN running_total_target_new_orders = 0 THEN 0
      WHEN running_total_target_spend = 0 THEN 0
      WHEN running_total_actual_spend = 0 THEN 0
      WHEN running_total_target_total_revenue = 0 THEN 0
      ELSE ((running_total_actual_total_revenue / running_total_actual_spend) - (running_total_target_total_revenue / running_total_target_spend)) / (running_total_target_total_revenue / running_total_target_spend)
    END AS delta_running_broas,
    aggregate_actual_spend,
    aggregate_actual_new_orders,
    aggregate_actual_new_revenue,
    CASE 
      WHEN aggregate_actual_new_orders = 0 THEN 0
      ELSE aggregate_actual_spend / aggregate_actual_new_orders 
    END AS aggregate_actual_cac,
    CASE 
      WHEN aggregate_actual_spend = 0 THEN 0 
      ELSE aggregate_actual_new_revenue / aggregate_actual_spend 
    END AS aggregate_actual_roas,
    CASE 
      WHEN aggregate_actual_new_revenue = 0 THEN 0 
      ELSE aggregate_actual_spend / aggregate_actual_new_revenue 
    END AS aggregate_actual_acos,
    CASE 
      WHEN aggregate_actual_new_orders = 0 THEN 0
      ELSE aggregate_actual_new_revenue / aggregate_actual_new_orders
    END AS aggregate_actual_new_aov,
    aggregate_actual_return_orders,
    aggregate_actual_return_revenue,
    CASE 
      WHEN aggregate_actual_return_orders = 0 THEN 0
      ELSE aggregate_actual_return_revenue / aggregate_actual_return_orders
    END AS aggregate_actual_return_aov,
    aggregate_actual_total_orders,
    aggregate_actual_total_revenue,
    CASE 
      WHEN aggregate_actual_total_orders = 0 THEN 0
      ELSE aggregate_actual_total_revenue / aggregate_actual_total_orders
    END AS aggregate_actual_total_aov,
    CASE 
      WHEN aggregate_actual_total_orders = 0 THEN 0
      ELSE aggregate_actual_spend / aggregate_actual_total_orders
    END AS aggregate_actual_cpo,
    CASE 
      WHEN aggregate_actual_spend = 0 THEN 0
      ELSE aggregate_actual_total_revenue / aggregate_actual_spend
    END AS aggregate_actual_broas,
    CASE 
      WHEN aggregate_actual_total_revenue = 0 THEN 0
      ELSE aggregate_actual_spend / aggregate_actual_total_revenue
    END AS aggregate_actual_mer,
    aggregate_target_spend,
    aggregate_target_new_orders,
    aggregate_target_new_revenue,
    aggregate_target_return_orders,
    aggregate_target_return_revenue,
    aggregate_target_total_orders,
    aggregate_target_total_revenue,
    CASE 
      WHEN aggregate_target_spend = 0 THEN 0
      ELSE (aggregate_actual_spend - aggregate_target_spend) / aggregate_target_spend 
    END AS delta_aggregate_spend,
    CASE 
      WHEN aggregate_target_new_revenue = 0 THEN 0
      ELSE (aggregate_actual_new_revenue - aggregate_target_new_revenue) / aggregate_target_new_revenue 
    END AS delta_aggregate_new_revenue,
    CASE 
      WHEN aggregate_target_new_orders = 0 THEN 0
      WHEN aggregate_actual_new_orders = 0 THEN 0
      WHEN aggregate_target_spend = 0 THEN 0
      ELSE ((aggregate_actual_spend / aggregate_actual_new_orders) - (aggregate_target_spend / aggregate_target_new_orders)) / (aggregate_target_spend / aggregate_target_new_orders)
    END AS delta_aggregate_cac,
    CASE 
      WHEN aggregate_target_spend = 0 THEN 0
      WHEN aggregate_actual_spend = 0 THEN 0
      WHEN aggregate_target_new_revenue = 0 THEN 0
      ELSE ((aggregate_actual_new_revenue / aggregate_actual_spend) - (aggregate_target_new_revenue / aggregate_target_spend)) / (aggregate_target_new_revenue / aggregate_target_spend)
    END AS delta_aggregate_roas,
    CASE 
      WHEN aggregate_actual_new_revenue = 0 THEN 0 
      WHEN aggregate_target_new_revenue = 0 THEN 0
      WHEN aggregate_target_spend = 0 THEN 0
      ELSE ((aggregate_actual_spend / aggregate_actual_new_revenue) - (aggregate_target_spend / aggregate_target_new_revenue)) / (aggregate_target_spend / aggregate_target_new_revenue)
    END AS delta_aggregate_acos,
    CASE 
      WHEN aggregate_actual_new_orders = 0 THEN 0
      WHEN aggregate_target_new_orders = 0 THEN 0
      WHEN aggregate_target_new_revenue = 0 THEN 0
      ELSE ((aggregate_actual_new_revenue / aggregate_actual_new_orders) - (aggregate_target_new_revenue / aggregate_target_new_orders)) / (aggregate_target_new_revenue / aggregate_target_new_orders)
    END AS delta_aggregate_new_aov,
    CASE 
      WHEN aggregate_target_return_revenue = 0 THEN 0
      ELSE (aggregate_actual_return_revenue - aggregate_target_return_revenue) / aggregate_target_return_revenue 
    END AS delta_aggregate_return_revenue,
    CASE 
      WHEN aggregate_actual_return_orders = 0 THEN 0
      WHEN aggregate_target_return_orders = 0 THEN 0
      WHEN aggregate_target_return_revenue = 0 THEN 0
      ELSE ((aggregate_actual_return_revenue / aggregate_actual_return_orders) - (aggregate_target_return_revenue / aggregate_target_return_orders)) / (aggregate_target_return_revenue / aggregate_target_return_orders)
    END AS delta_aggregate_return_aov,
    CASE 
      WHEN aggregate_target_total_revenue = 0 THEN 0
      ELSE (aggregate_actual_total_revenue - aggregate_target_total_revenue) / aggregate_target_total_revenue 
    END AS delta_aggregate_total_revenue,
    CASE 
      WHEN aggregate_actual_total_orders = 0 THEN 0
      WHEN aggregate_target_total_orders = 0 THEN 0
      WHEN aggregate_target_total_revenue = 0 THEN 0
      ELSE ((aggregate_actual_total_revenue / aggregate_actual_total_orders) - (aggregate_target_total_revenue / aggregate_target_total_orders)) / (aggregate_target_total_revenue / aggregate_target_total_orders)
    END AS delta_aggregate_total_aov,
    CASE 
      WHEN aggregate_target_total_orders = 0 THEN 0
      WHEN aggregate_actual_total_orders = 0 THEN 0
      WHEN aggregate_target_spend = 0 THEN 0
      ELSE ((aggregate_actual_spend / aggregate_actual_total_orders) - (aggregate_target_spend / aggregate_target_total_orders)) / (aggregate_target_spend / aggregate_target_total_orders)
    END AS delta_aggregate_cpo,
    CASE 
      WHEN aggregate_target_spend = 0 THEN 0
      WHEN aggregate_actual_spend = 0 THEN 0
      WHEN aggregate_target_total_revenue = 0 THEN 0
      ELSE ((aggregate_actual_total_revenue / aggregate_actual_spend) - (aggregate_target_total_revenue / aggregate_target_spend)) / (aggregate_target_total_revenue / aggregate_target_spend)
    END AS delta_aggregate_broas,
    CASE 
      WHEN aggregate_actual_total_revenue = 0 THEN 0 
      WHEN aggregate_target_total_revenue = 0 THEN 0
      WHEN aggregate_target_spend = 0 THEN 0
      ELSE ((aggregate_actual_spend / aggregate_actual_total_revenue) - (aggregate_target_spend / aggregate_target_total_revenue)) / (aggregate_target_spend / aggregate_target_total_revenue)
    END AS delta_aggregate_mer
  FROM
    runningtotals
  ORDER BY date;
`;

  const options = {
    query: kpiQuery,
    location: 'US', // Specify the location if needed
  };

  try {
    const [rows] = await bigquery.query(options);
    console.log('Data fetched successfully:', rows); // Add this line
    return rows;
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  }
}

module.exports = fetchData;
