/* eslint-disable no-unused-vars */
import classes from './LoadingLogo.module.scss';
import logo from '/meowth.png';

export interface LoadingLogoProps {
  message: string;
  children?: any;
}

export default function LoadingLogo(props: LoadingLogoProps) {


  return (
    <div className={ `${classes.parentClass} w-100` }>
      <div>
        <div className={ classes.loadingLogo }>
          <img src={ logo }
            className={ `${classes.logoImg} d-inline-block` } alt="logo" />
        </div>
    
      </div>
      <div className={ classes.loadingParent }>
        <div className={ classes.ldsFacebook }><div></div><div></div><div></div></div>
      </div>
      <div className={ classes.secfont }>
        Loading {props.message} ...
      </div>
    </div>
  );
}