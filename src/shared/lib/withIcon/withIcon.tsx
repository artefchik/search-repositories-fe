import {ComponentType, createElement} from 'react'
import {classNames} from "shared/lib/classNames";
import "./withIcon.css"

export const withIcon = (WrappedComponent: ComponentType<SVGSVGElement>, className?: string) => {
    const Wrapped = () => (
        <span className={classNames('icon', {}, [className])}>
           {createElement(WrappedComponent)}
        </span>
    )

    const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Unknown'
    Wrapped.displayName = `withIcon(${wrappedComponentName})`

    return Wrapped
}
