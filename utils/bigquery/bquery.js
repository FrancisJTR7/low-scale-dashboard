const bigquery = require('./client');

async function fetchData(tableIdentifier, queryType) {
  let query;

  switch (queryType) {
    case 'dailyRevenue':
      query = `WITH base AS (
  SELECT
    FORMAT_DATE('%Y-%m', PARSE_DATE('%m/%d/%Y', t.day)) AS month
  , PARSE_DATE('%m/%d/%Y', t.day) AS date
    , CASE
        WHEN DATE('2024-08-12') < PARSE_DATE('%m/%d/%Y', t.day) THEN NULL
        ELSE p.total_spend
      END AS total_spend
    , CASE
        WHEN DATE('2024-08-12') < PARSE_DATE('%m/%d/%Y', t.day) THEN NULL
        ELSE p.new_orders
      END AS new_orders
    , CASE
        WHEN DATE('2024-08-12') < PARSE_DATE('%m/%d/%Y', t.day) THEN NULL
        ELSE p.new_revenue
      END AS new_revenue
    , CASE
        WHEN DATE('2024-08-12') < PARSE_DATE('%m/%d/%Y', t.day) THEN NULL
        ELSE p.return_orders
      END AS return_orders
    , CASE
        WHEN DATE('2024-08-12') < PARSE_DATE('%m/%d/%Y', t.day) THEN NULL
        ELSE p.return_revenue
      END AS return_revenue
    , CAST(t.spend AS NUMERIC) AS target_spend
    , CAST(t.new_orders AS NUMERIC) AS target_new_orders
    , CAST(t.new_revenue AS NUMERIC) AS target_new_revenue
    , CAST(t.return_orders AS NUMERIC) AS target_return_orders
    , CAST(t.return_revenue AS NUMERIC) AS target_return_revenue
  FROM 
    \`orcaanalytics.google_sheets__${tableIdentifier}.projections\` t
  LEFT JOIN
    \`orcaanalytics.analytics.pacing__${tableIdentifier}\` p 
    ON PARSE_DATE('%m/%d/%Y', t.day) = DATE(p.date)
  WHERE
    PARSE_DATE('%m/%d/%Y', t.day) >= DATE('2024-08-01')
    AND FORMAT_DATE('%Y-%m', PARSE_DATE('%m/%d/%Y', t.day)) <= FORMAT_DATE('%Y-%m', DATE('2024-08-12'))
)
, dailypacing AS (
  SELECT
    month
    , date
    , ROUND(SUM(total_spend), 2) AS actual_spend
    , SUM(new_orders) AS actual_new_orders
    , SUM(new_revenue) AS actual_new_revenue
    , SUM(return_orders) AS actual_return_orders
    , SUM(return_revenue) AS actual_return_revenue
    , SUM(new_orders) + SUM(return_orders) AS actual_total_orders
    , SUM(new_revenue) + SUM(return_revenue) AS actual_total_revenue
    , SUM(target_spend) AS target_spend
    , SUM(target_new_orders) AS target_new_orders
    , SUM(target_new_revenue) AS target_new_revenue
    , SUM(target_return_orders) AS target_return_orders
    , SUM(target_return_revenue) AS target_return_revenue
    , SUM(target_new_orders) + SUM(target_return_orders) AS target_total_orders
    , SUM(target_new_revenue) + SUM(target_return_revenue) AS target_total_revenue
    , CASE
        WHEN SUM(target_spend) = 0 THEN 0
        ELSE (SUM(total_spend) - SUM(target_spend)) / SUM(target_spend)
      END AS daily_delta_spend
    , CASE
        WHEN SUM(target_new_orders) = 0 THEN 0
        ELSE (SUM(new_orders) - SUM(target_new_orders)) / SUM(target_new_orders)
      END AS daily_delta_new_orders
    , CASE
        WHEN SUM(target_new_revenue) = 0 THEN 0
        ELSE (SUM(new_revenue) - SUM(target_new_revenue)) / SUM(target_new_revenue)
      END AS daily_delta_new_revenue
    , CASE
        WHEN SUM(target_return_orders) = 0 THEN 0
        ELSE (SUM(return_orders) - SUM(target_return_orders)) / SUM(target_return_orders)
      END AS daily_delta_return_orders
    , CASE
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
)
, runningtotals AS (
  SELECT
    month
    , date
    , actual_spend
    , actual_new_orders
    , actual_new_revenue
    , actual_return_orders
    , actual_return_revenue
    , actual_total_orders
    , actual_total_revenue
    , target_spend
    , target_new_orders
    , target_new_revenue
    , target_return_orders
    , target_return_revenue
    , target_total_orders
    , target_total_revenue
    , SUM(actual_spend) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_spend
    , SUM(actual_new_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_new_orders
    , SUM(actual_new_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_new_revenue
    , SUM(actual_return_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_return_orders
    , SUM(actual_return_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_return_revenue
    , SUM(actual_total_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_total_orders
    , SUM(actual_total_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_actual_total_revenue
    , SUM(target_spend) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_spend
    , SUM(target_new_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_new_orders
    , SUM(target_new_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_new_revenue
    , SUM(target_return_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_return_orders
    , SUM(target_return_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_return_revenue
    , SUM(target_total_orders) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_total_orders
    , SUM(target_total_revenue) OVER (ORDER BY date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_target_total_revenue
    , SUM(actual_spend) OVER () AS aggregate_actual_spend
    , SUM(actual_new_orders) OVER () AS aggregate_actual_new_orders
    , SUM(actual_new_revenue) OVER () AS aggregate_actual_new_revenue
    , SUM(actual_return_orders) OVER () AS aggregate_actual_return_orders
    , SUM(actual_return_revenue) OVER () AS aggregate_actual_return_revenue
    , SUM(actual_total_orders) OVER () AS aggregate_actual_total_orders
    , SUM(actual_total_revenue) OVER () AS aggregate_actual_total_revenue
    , SUM(target_spend) OVER () AS aggregate_target_spend
    , SUM(target_new_orders) OVER () AS aggregate_target_new_orders
    , SUM(target_new_revenue) OVER () AS aggregate_target_new_revenue
    , SUM(target_return_orders) OVER () AS aggregate_target_return_orders
    , SUM(target_return_revenue) OVER () AS aggregate_target_return_revenue
    , SUM(target_total_orders) OVER () AS aggregate_target_total_orders
    , SUM(target_total_revenue) OVER () AS aggregate_target_total_revenue
  FROM
    dailypacing
  GROUP BY
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
)
SELECT
  month
  , date
  , actual_spend
  , actual_new_orders
  , actual_new_revenue
  , actual_return_orders
  , actual_return_revenue
  , actual_total_orders
  , actual_total_revenue
  , target_spend
  , target_new_orders
  , target_new_revenue
  , target_return_orders
  , target_return_revenue
  , target_total_orders
  , target_total_revenue
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_spend 
	  end as running_total_actual_spend
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_new_orders 
	  end as running_total_actual_new_orders
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_new_revenue 
	  end as running_total_actual_new_revenue
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_return_orders 
	  end as running_total_actual_return_orders
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_return_revenue 
	  end as running_total_actual_return_revenue
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_total_orders 
	  end as running_total_actual_total_orders
  , case 
      when DATE('2024-08-12') < date then null 
      else running_total_actual_total_revenue 
	  end as running_total_actual_total_revenue
  , running_total_target_spend
  , running_total_target_new_orders
  , running_total_target_new_revenue
  , running_total_target_return_orders
  , running_total_target_return_revenue
  , running_total_target_total_orders
  , running_total_target_total_revenue
  , case 
      when running_total_target_spend = 0 then 0
     else (running_total_actual_spend - running_total_target_spend) / running_total_target_spend 
     end as delta_running_total_spend
  , case 
      when running_total_target_new_revenue = 0 then 0
      else (running_total_actual_new_revenue - running_total_target_new_revenue) / running_total_target_new_revenue 
      end as delta_running_new_revenue
  , case 
      when running_total_target_new_orders = 0 then 0
      when running_total_target_spend = 0 then 0
      when running_total_target_spend = 0 then 0
      when running_total_actual_new_orders = 0 then 0
      else ((running_total_actual_spend/running_total_actual_new_orders) - (running_total_target_spend/running_total_target_new_orders)) / ((running_total_target_spend)/(running_total_target_new_orders)) 
      end as delta_running_cac
  , case 
      when running_total_target_return_revenue = 0 then 0
      else (running_total_actual_return_revenue - running_total_target_return_revenue) / running_total_target_return_revenue 
      end as delta_running_return_revenue
  , case 
      when running_total_target_total_revenue = 0 then 0
      else (running_total_actual_total_revenue - running_total_target_total_revenue) / running_total_target_total_revenue 
      end as delta_running_total_revenue
  , case 
	  when DATE('2024-08-12') < date then -1 
	  when running_total_target_total_revenue = 0 then 0
      else (running_total_actual_total_revenue - running_total_target_total_revenue) / running_total_target_total_revenue 
      end as delta_running_total_revenue_todate
  , case 
      when running_total_target_total_orders = 0 then 0
      when running_total_target_spend = 0 then 0
      when running_total_actual_total_orders = 0 then 0
      else ((running_total_actual_spend/running_total_actual_total_orders) - (running_total_target_spend/ running_total_target_total_orders)) / ((running_total_target_spend)/(running_total_target_total_orders)) 
      end as delta_running_cpo
  , case 
      when running_total_target_new_orders = 0 then 0
      when running_total_target_spend = 0 then 0
      when running_total_actual_spend = 0 then 0
      when running_total_target_total_revenue = 0 then 0
      else ((running_total_actual_total_revenue/running_total_actual_spend) - (running_total_target_total_revenue/running_total_target_spend)) / ((running_total_target_total_revenue)/(running_total_target_spend)) 
      end as delta_running_broas
  , aggregate_actual_spend
  , aggregate_actual_new_orders
  , aggregate_actual_new_revenue
  , aggregate_actual_return_orders
  , aggregate_actual_return_revenue
  , aggregate_actual_total_orders
  , aggregate_actual_total_revenue
  , aggregate_target_spend
  , aggregate_target_new_orders
  , aggregate_target_new_revenue
  , aggregate_target_return_orders
  , aggregate_target_return_revenue
  , aggregate_target_total_orders
  , aggregate_target_total_revenue
  , case 
      when aggregate_target_spend = 0 then 0
      else (aggregate_actual_spend - aggregate_target_spend) / aggregate_target_spend 
      end as delta_aggregate_spend
  , case 
      when aggregate_target_new_revenue = 0 then 0
      else (aggregate_actual_new_revenue - aggregate_target_new_revenue) / aggregate_target_new_revenue 
      end as delta_aggregate_new_revenue
  , case 
      when aggregate_target_new_orders = 0 then 0
      when aggregate_target_spend = 0 then 0
      when aggregate_actual_new_orders = 0 then 0
      else ((aggregate_actual_spend/aggregate_actual_new_orders) - (aggregate_target_spend/aggregate_target_new_orders)) / ((aggregate_target_spend)/(aggregate_target_new_orders)) 
      end as delta_aggregate_cac
  , case 
      when aggregate_target_return_revenue = 0 then 0
      else (aggregate_actual_return_revenue - aggregate_target_return_revenue) / aggregate_target_return_revenue 
      end as delta_aggregate_return_revenue
  , case 
      when aggregate_target_total_revenue = 0 then 0
      else (aggregate_actual_total_revenue - aggregate_target_total_revenue) / aggregate_target_total_revenue 
      end as delta_aggregate_total_revenue
  , case 
      when aggregate_target_total_orders = 0 then 0
      when aggregate_target_spend = 0 then 0
      when aggregate_actual_total_orders = 0 then 0
      else ((aggregate_actual_spend/aggregate_actual_total_orders) - (aggregate_target_spend/aggregate_target_total_orders)) / ((aggregate_target_spend)/(aggregate_target_total_orders)) 
      end as delta_aggregate_cpo
  , case 
      when aggregate_target_spend = 0 then 0
      when aggregate_actual_spend = 0 then 0
      when aggregate_target_total_revenue = 0 then 0
      else ((aggregate_actual_total_revenue/aggregate_actual_spend) - (aggregate_target_total_revenue/aggregate_target_spend)) / ((aggregate_target_total_revenue/aggregate_target_spend)) 
      end as delta_aggregate_broas
  , case 
      when aggregate_actual_total_revenue = 0 then 0 
      when aggregate_target_total_revenue = 0 then 0
      when aggregate_target_spend = 0 then 0
      else ((aggregate_actual_spend/aggregate_actual_total_revenue) - (aggregate_target_spend/aggregate_target_total_revenue)) / ((aggregate_target_spend/aggregate_target_total_revenue)) 
      end as delta_aggregate_acos
FROM
  runningtotals
  order by date `;
      break;
    case 'kpi':
      query = `
  WITH base AS (
    SELECT
      FORMAT_DATE('%Y-%m', PARSE_DATE('%m/%d/%Y', t.day)) AS month,
      PARSE_DATE('%m/%d/%Y', t.day) AS date,
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
      \`orcaanalytics.analytics.pacing__${tableIdentifier}\` p 
    LEFT JOIN
      \`orcaanalytics.google_sheets__${tableIdentifier}.projections\` t
      ON PARSE_DATE('%m/%d/%Y', t.day) = DATE(p.date)
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
      month, date
    ORDER BY
      date
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
      date >= DATE_TRUNC(CURRENT_DATE(), MONTH) AND date < CURRENT_DATE()
    GROUP BY
      month, date, actual_spend, actual_new_orders, actual_new_revenue, actual_return_orders, actual_return_revenue, actual_total_orders, actual_total_revenue, target_spend, target_new_orders, target_new_revenue, target_return_orders, target_return_revenue, target_total_orders, target_total_revenue
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
    ELSE ((aggregate_actual_spend / aggregate_actual_new_orders) - (aggregate_target_spend / aggregate_target_new_orders)) / (aggregate_target_spend / aggregate_target_new_orders)
  END AS delta_aggregate_cac,
  CASE
    WHEN aggregate_target_spend = 0 THEN 0
    ELSE ((aggregate_actual_new_revenue / aggregate_actual_spend) - (aggregate_target_new_revenue / aggregate_target_spend)) / (aggregate_target_new_revenue / aggregate_target_spend)
  END AS delta_aggregate_roas,
  CASE
    WHEN aggregate_actual_new_revenue = 0 THEN 0
    ELSE ((aggregate_actual_spend / aggregate_actual_new_revenue) - (aggregate_target_spend / aggregate_target_new_revenue)) / (aggregate_target_spend / aggregate_target_new_revenue)
  END AS delta_aggregate_acos,
  CASE
    WHEN aggregate_actual_new_orders = 0 THEN 0
    ELSE ((aggregate_actual_new_revenue / aggregate_actual_new_orders) - (aggregate_target_new_revenue / aggregate_target_new_orders)) / (aggregate_target_new_revenue / aggregate_target_new_orders)
  END AS delta_aggregate_new_aov,
  CASE
    WHEN aggregate_target_return_revenue = 0 THEN 0
    ELSE (aggregate_actual_return_revenue - aggregate_target_return_revenue) / aggregate_target_return_revenue
  END AS delta_aggregate_return_revenue,
  CASE
    WHEN aggregate_actual_return_orders = 0 THEN 0
    ELSE ((aggregate_actual_return_revenue / aggregate_actual_return_orders) - (aggregate_target_return_revenue / aggregate_target_return_orders)) / (aggregate_target_return_revenue / aggregate_target_return_orders)
  END AS delta_aggregate_return_aov,
  CASE
    WHEN aggregate_target_total_revenue = 0 THEN 0
    ELSE (aggregate_actual_total_revenue - aggregate_target_total_revenue) / aggregate_target_total_revenue
  END AS delta_aggregate_total_revenue,
  CASE
    WHEN aggregate_actual_total_orders = 0 THEN 0
    ELSE ((aggregate_actual_total_revenue / aggregate_actual_total_orders) - (aggregate_target_total_revenue / aggregate_target_total_orders)) / (aggregate_target_total_revenue / aggregate_target_total_orders)
  END AS delta_aggregate_total_aov,
  CASE
    WHEN aggregate_actual_total_orders = 0 THEN 0
    ELSE ((aggregate_actual_spend / aggregate_actual_total_orders) - (aggregate_target_spend / aggregate_target_total_orders)) / (aggregate_target_spend / aggregate_target_total_orders)
  END AS delta_aggregate_cpo,
  CASE
    WHEN aggregate_target_spend = 0 THEN 0
    ELSE ((aggregate_actual_total_revenue / aggregate_actual_spend) - (aggregate_target_total_revenue / aggregate_target_spend)) / (aggregate_target_total_revenue / aggregate_target_spend)
  END AS delta_aggregate_broas,
  CASE
    WHEN aggregate_actual_total_revenue = 0 THEN 0
    ELSE ((aggregate_actual_spend / aggregate_actual_total_revenue) - (aggregate_target_spend / aggregate_target_total_revenue)) / (aggregate_target_spend / aggregate_target_total_revenue)
  END AS delta_aggregate_mer
FROM
  runningtotals
ORDER BY
  date;
`;
      break;
    default:
      throw new Error(`Unknown query type: ${queryType}`);
  }

  const options = {
    query,
    location: 'US', // Specify the location if needed
  };

  try {
    const [rows] = await bigquery.query(options);
    console.log('Data fetched successfully:', rows);
    return rows;
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  }
}

module.exports = fetchData;
