import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert as AlertMessage } from '@mui/material';
import PropTypes from 'prop-types';
import { AlertService, AlertType } from '../../service/alertService';


const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    const history = useLocation();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const subscription = AlertService.onAlert(id)
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    setAlerts(alerts => ([...alerts, alert]));


                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        const historyUnlisten = () => {
            if (history.pathname.endsWith('/')) return;
            AlertService.clear(id);
        };

        return () => {
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    function removeAlert(alert) {
        if (fade) {
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = [];

        const alertTypeClass = {
            [AlertType.Success]: 'success',
            [AlertType.Error]: 'error',
            [AlertType.Info]: 'info',
            [AlertType.Warning]: 'warning'
        }
        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="container">
            <div className="m-3">
                {alerts.map((alert, index) =>
                    <AlertMessage key={index} onClose={() => removeAlert(alert)} severity={cssClasses(alert)}>
                        <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
                    </AlertMessage>
                )}
            </div>
        </div>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };