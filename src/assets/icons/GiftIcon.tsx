import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

interface OwnProps extends SvgIconProps {}

type Props = FCProps<OwnProps>;

export function GiftIcon(props: Props) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 37 40">
        <path
          fill="#FFF"
          d="M33.922 7.788h-4.306c.515-.79.816-1.732.816-2.744C30.432 2.263 28.163 0 25.374 0c-1.849 0-3.469.995-4.35 2.477-.733-.583-1.66-.933-2.668-.933-1.008 0-1.934.35-2.667.933C14.807.995 13.187 0 11.338 0 8.549 0 6.28 2.263 6.28 5.044c0 1.012.301 1.953.817 2.744H2.79C1.252 7.788 0 9.036 0 10.57v4.051c0 1.028.561 1.926 1.394 2.408v19.03c0 2.172 1.773 3.94 3.951 3.94h26.022c2.179 0 3.951-1.768 3.951-3.94V17.03c.833-.482 1.394-1.38 1.394-2.408v-4.05c0-1.536-1.251-2.784-2.79-2.784zM22.756 5.15c0-1.503 1.225-2.727 2.73-2.727 1.506 0 2.73 1.224 2.73 2.728 0 1.503-1.224 2.727-2.73 2.727h-2.73V5.15zm1.045 4.85l3.506 6.217-.826-.223c-.296-.08-.61-.039-.876.116-.265.154-.459.408-.538.706l-.202.759L20.632 10h3.17zm-5.445-6.062c1.088 0 1.972.884 1.972 1.97 0 1.086-.884 1.97-1.972 1.97-1.087 0-1.972-.884-1.972-1.97 0-1.086.885-1.97 1.972-1.97zm-2.275 6.364l-3.59 6.06-.212-.768c-.08-.29-.277-.538-.546-.688-.27-.15-.59-.19-.89-.113l-.83.215 2.777-4.706h3.29zm-4.855-7.879c1.506 0 2.73 1.224 2.73 2.727V7.88h-2.73c-1.506 0-2.73-1.224-2.73-2.728 0-1.503 1.224-2.727 2.73-2.727zM2.427 14.698v-3.942c0-.25.209-.453.466-.453h7.423l-2.84 4.849H2.894c-.257 0-.466-.204-.466-.454zm17.901 22.878H5.264c-.895 0-1.623-.723-1.623-1.612V17.439h3.087c.013.02.025.041.04.06.286.368.766.53 1.218.409l2.384-.635.638 2.368c.121.45.504.783.97.843.05.007.1.01.15.01.411 0 .797-.218 1.005-.58l.706-1.224v11.637c0 .635.518 1.15 1.158 1.15.64 0 1.16-.515 1.16-1.15v-12.82h4.171v20.069zm-4.247-22.424l2.448-4.243 2.406 4.243h-4.854zm16.99 21.101c0 .897-.736 1.626-1.642 1.626h-8.673v-19.1l1.519 2.672c.21.369.602.592 1.021.592.049 0 .098-.003.147-.01.473-.058.863-.395.986-.85l.645-2.388 2.412.64c.456.122.942-.04 1.231-.41.29-.37.326-.876.092-1.283l-.095-.166h2.357v18.677zm-17.729-2.775c.289 0 .571.116.775.32.204.205.321.487.321.776 0 .288-.117.57-.32.775-.205.203-.487.32-.776.32-.288 0-.57-.117-.774-.32-.204-.204-.321-.487-.321-.775 0-.29.117-.572.32-.776.205-.204.487-.32.775-.32zm18.476-23.175c.257 0 .467.203.467.453v3.942c0 .25-.21.454-.467.454h-4.585l-2.837-4.849h7.422z"
        />
      </svg>
    </SvgIcon>
  );
}