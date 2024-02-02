/*MES*/
SELECT X.Cuenta,
       X.Descripcion,
       X.CentroCostos,
       X.Criterio,
       X.Grupo,
       X.Saldo Mes,
       Y.Saldo Acumulado
  FROM (  SELECT B.Cuenta,                            /*SERVICIOS OPERATIVOS*/
                 B.Descripcion,
                 SUM (NVL (A.Abonos, 0) - NVL (A.Cargos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 1 Orden,
                 'Utilidad Bruta' Criterio,
                 'SERVICIOS OPERATIVOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND SUBSTR (B.Cuenta, 1, 1) = '5'
                 AND B.RAMA = 'S'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                        /*COSTOS OPERATIVOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 2 Orden,
                 'Utilidad Bruta' Criterio,
                 'COSTOS OPERATIVOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND SUBSTR (B.Cuenta, 1, 1) = '4'
                 AND B.RAMA = 'T'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                        /*GASTOS OPERATIVOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 3 Orden,
                 'UAFIR' Criterio,
                 'GASTOS OPERATIVOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND SUBSTR (B.Cuenta, 1, 1) = '4'
                 AND B.RAMA = 'U'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                           /*OTROS INGRESOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Abonos, 0)-NVL (A.Cargos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 3 Orden,
                 'UAFIR' Criterio,
                 'SERVICIOS NO OPERACION' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '5103'
                 AND B.RAMA = 'S1'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
         UNION ALL                                 /*VENTA DE ACCESORIOS DE LABORATORIO*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Abonos, 0)- NVL (A.Cargos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 3 Orden,
                 'UAFIR' Criterio,
                 'SERVICIOS NO OPERACION' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '5102'
                 AND B.RAMA = 'S'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                             /*OTROS GASTOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 4 Orden,
                 'Utilidad Antes de Impuestos' Criterio,
                 'OTROS GASTOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '4107'
                 AND B.RAMA = 'U2'
                  AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                     /*PERDIDAS Y GANANCIAS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 4 Orden,
                 'Utilidad Neta' Criterio,
                 'PERDIDAS Y GANANCIAS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '6101'
                 AND B.RAMA = 'R3'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo BETWEEN $P{PERIODOD} AND $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        ORDER BY ORDEN, 1) X,
       /*A C U M U L A D O*/
       (  SELECT B.Cuenta,                            /*SERVICIOS OPERATIVOS*/
                 B.Descripcion,
                 SUM (NVL (A.Abonos, 0) - NVL (A.Cargos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 1 Orden,
                 'Utilidad Bruta' Criterio,
                 'SERVICIOS OPERATIVOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND SUBSTR (B.Cuenta, 1, 1) = '5'
                 AND B.RAMA = 'S'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                        /*COSTOS OPERATIVOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 2 Orden,
                 'Utilidad Bruta' Criterio,
                 'COSTOS OPERATIVOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND SUBSTR (B.Cuenta, 1, 1) = '4'
                 AND B.RAMA = 'T'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                        /*GASTOS OPERATIVOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 3 Orden,
                 'UAFIR' Criterio,
                 'GASTOS OPERATIVOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND SUBSTR (B.Cuenta, 1, 1) = '4'
                 AND B.RAMA = 'U'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                           /*OTROS INGRESOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Abonos, 0)- NVL (A.Cargos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 3 Orden,
                 'UAFIR' Criterio,
                 'SERVICIOS NO OPERACION' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '5103'
                 AND B.RAMA = 'S1'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                           /*VENTA DE ACCESORIOS DE LABORATORIO*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Abonos, 0)- NVL (A.Cargos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 3 Orden,
                 'UAFIR' Criterio,
                 'SERVICIOS NO OPERACION' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '5102'
                 AND B.RAMA = 'S'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                             /*OTROS GASTOS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 4 Orden,
                 'Utilidad Antes de Impuestos' Criterio,
                 'OTROS GASTOS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '4107'
                 AND B.RAMA = 'U2'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        UNION ALL                                     /*PERDIDAS Y GANANCIAS*/
          SELECT B.Cuenta,
                 B.Descripcion,
                 SUM (NVL (A.Cargos, 0) - NVL (A.Abonos, 0)) Saldo,
                 (SELECT Descripcion
                    FROM CentroCostos
                   WHERE CentroCostos = A.Subcuenta)
                    CentroCostos,
                 4 Orden,
                 'Utilidad Neta' Criterio,
                 'PERDIDAS Y GANANCIAS' Grupo
            FROM Acum A, Cta B
           WHERE     A.Cuenta(+) = B.Cuenta
                 AND B.Tipo = 'Mayor'
                 AND B.Cuenta = '6101'
                 AND B.RAMA = 'R3'
                 AND A.Ejercicio = $P{EJERCICIO}
                 AND A.Periodo <= $P{PERIODOA}
        GROUP BY B.Cuenta, B.Descripcion, A.Subcuenta
        ORDER BY ORDEN, 1) Y
 WHERE     X.CUENTA = Y.CUENTA(+)
       AND X.DESCRIPCION = Y.DESCRIPCION(+)
       AND Nvl(X.CENTROCOSTOS, '--') = Nvl(Y.CENTROCOSTOS(+), '--')
       AND X.CRITERIO = Y.CRITERIO(+)
       AND X.GRUPO = Y.GRUPO(+)
       AND X.SALDO != 0
       AND Y.SALDO != 0
ORDER BY X.Criterio DESC, X.Grupo, X.Descripcion, X.CentroCostos