import './skeleton.scss';

const Skeleton = ({ width = '100%', height = '12px' }) => {
  return (
    <span className="skeleton" style={{ width: `${width}`, height: `${height}` }}></span>
  )
}

export { Skeleton };