// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useDispatch} from 'react-redux';

import {FormattedMessage} from 'react-intl';

import {DispatchFunc} from 'mattermost-redux/types/actions';

import {openModal} from 'actions/views/modals';
import {trackEvent} from 'actions/telemetry_actions';
import {ModalIdentifiers} from 'utils/constants';
import PurchaseModal from 'components/purchase_modal';

import './link.scss';

export interface UpgradeLinkProps {
    telemetryInfo?: string;
    buttonText?: string;
    styleButton?: boolean;
}

const UpgradeLink: React.FC<UpgradeLinkProps> = (props: UpgradeLinkProps) => {
    const dispatch = useDispatch<DispatchFunc>();
    const styleButton = props.styleButton ? 'style-button' : '';
    const handleLinkClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (props.telemetryInfo) {
            trackEvent('upgrade_mm_cloud', props.telemetryInfo);
        }
        try {
            dispatch(openModal({
                modalId: ModalIdentifiers.CLOUD_PURCHASE,
                dialogType: PurchaseModal,
            }));
        } catch (error) {
            // do nothing
        }
    };
    return (
        <button
            className={`upgradeLink ${styleButton}`}
            onClick={(e) => handleLinkClick(e)}
        >
            {props.buttonText ? props.buttonText : <FormattedMessage
                id='upgradeLink.warn.upgrade_now'
                defaultMessage='Upgrade now'
            />}
        </button>
    );
};

export default UpgradeLink;
