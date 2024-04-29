import { useState } from "react";
import styled from "styled-components";
import { Control, InstallMeterControl, RegionControl, Template, TextboxControl } from "../services/WorkTaskServiceService";
import UIComponentControl from "./ui-component-control";
import UITextboxControl from "./ui-textbox-control";
import UIRegionControl from "./ui-region-control";
import UIInstallMeterControl from "./ui-install-meter-control";


interface Props {
    control?: Control;

}
const UIControl = (props: Props) => {
    const { control } = props;

    const renderControl = (control: Control | undefined) => {
        if (!control) return <></>;
        const map: Record<Control['type'], JSX.Element> = {
            "InstallMeterControl": <UIInstallMeterControl control={control as InstallMeterControl}></UIInstallMeterControl>,
            "ComponentControl": <UIComponentControl control={control as InstallMeterControl}></UIComponentControl>,
            "TextboxControl": <UITextboxControl control={control as TextboxControl}></UITextboxControl>,
            "RegionControl": <UIRegionControl control={control as RegionControl}></UIRegionControl>,
        };
        return map[control.type];
    }

    return (
        <>
            {renderControl(control)}
        </>
    );
}

export default UIControl;
