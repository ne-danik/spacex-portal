import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// services
import useSpacexService from '../../../services/spasexService';
// utils
import setContent from '../../../utils/setContent';
// components
import { Breadcrumbs, CrumbLabel, Divider, ForvardLink } from '../../../components/Breadcrumbs/Breadcrumbs';
import { Skeleton } from '../../../components/Skeleton/Skeleton';
import { ExternalLink } from '../../../components/AppLinks/AppLinks';
// styles
import './singleCrewPage.scss';

const SingleCrewLayout = ({ data }) => {
  const { name, image, status, launches, agency, wikipedia } = data;

  const [launchesList, setLaunchesList] = useState([]);

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();

  useEffect(() => {
    clearError();
    getAllLaunches()
      .then((data) => {
        const arr = data.filter((item) => launches.includes(item?.id) ? item : null)
        setLaunchesList(arr)
      })
      .then(() => setProcess('success'))
  }, [launches])

  const renderLaunches = (data) => {
    const elements = data.length ? (
      data.map((item) => {
        return (
          <li key={item.id} className="profile__launches-item">
            <Link className="profile__launches-link" to={`/launches/${item.id}`}>
              <span className="profile__launches-name">{item.name}</span>
              <span className="profile__launches-date">{moment(item.date).format('MMM DD')}</span>
            </Link>
          </li>
        )
      })
    ) : (
      'No launches'
    )
    return (
      <ul className="profile__launches-items">
        {elements}
      </ul>
    )
  }

  const renderAgency = (agency) => {
    switch (agency.toLowerCase().replace(" ", "")) {
      case 'nasa':
        return <ExternalLink url="https://www.nasa.gov" label={agency} />
      case 'axiomspace':
        return <ExternalLink url="https://www.axiomspace.com" label={agency} />
      case 'spacex':
        return <ExternalLink url="https://www.spacex.com" label={agency} />
      case 'jaxa':
        return <ExternalLink url="https://global.jaxa.jp" label={agency} />
      case 'esa':
        return <ExternalLink url="https://www.esa.int" label={agency} />
      default:
        return <span>{agency}</span>
    }
  }

  return (
    <>
      <Breadcrumbs>
        <ForvardLink />
        <Divider />
        <CrumbLabel label="Crew" />
      </Breadcrumbs>

      <article className="article">
        <div className="container">
          <div className="article__inner">
            <h2 className="article__title">{name}</h2>
            <div className="article__content profile">
              <div className="profile__left">
                <div className="article__text">
                  <a className="wiki_link" href={wikipedia} rel="nofollow noopener noreferrer" target="_blank">
                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.4598 2.36659C24.3498 4.87495 20.9547 12.8198 18.6892 17.9983C18.6861 18.0006 18.0957 17.9971 18.0941 17.9962L14.5213 9.58088C13.1053 12.3581 11.5364 15.2451 10.1948 17.9923C10.1868 18.0062 9.54571 17.9987 9.5449 17.9899C7.49391 13.2025 5.36735 8.44651 3.30563 3.66266C2.82832 2.49323 1.15392 0.612328 0.00798758 0.623146C0.00798758 0.487308 0.00159427 0.184154 0 0.000813729L7.06256 0L7.05695 0.611515C6.22777 0.649907 4.79464 1.17911 5.16612 2.09459C6.16148 4.24384 9.68594 12.5701 10.6385 14.6839C11.3031 13.383 13.1592 9.91519 13.9238 8.44936C13.3246 7.21991 11.3447 2.62981 10.7512 1.47388C10.3034 0.720185 9.17984 0.627945 8.31471 0.614768C8.31471 0.42183 8.32472 0.273221 8.32114 0.00837777L14.5293 0.0275745V0.591587C13.6889 0.614769 12.8933 0.92744 13.2539 1.73108C14.0891 3.4646 14.5768 4.69877 15.3433 6.30207C15.5881 5.83233 16.8431 3.25767 17.4415 1.89888C17.8029 0.995358 17.2629 0.657065 15.7511 0.616314C15.7711 0.467705 15.7579 0.16935 15.7711 0.0271672L21.1328 0.0323731L21.1353 0.591993C20.1499 0.630304 19.1298 1.15511 18.5974 1.96997L16.0155 7.32459C16.2987 8.03274 18.7811 13.5475 19.0423 14.159L24.3802 1.83812C24.0003 0.840812 22.7888 0.617941 22.3151 0.607123C22.3181 0.46042 22.319 0.242548 22.3197 0.0506669L22.3199 0.00325337L27.8922 0.0191959L27.9003 0.0471769L27.8911 0.60395C26.6684 0.641123 25.9123 1.29493 25.4598 2.36659Z" fill="white" />
                    </svg>
                    <span>Read</span>
                  </a>
                </div>
                <div className="article__text">
                  Career status: <span className="profile__status">{status}</span>
                </div>
                <div className="article__text">
                  Agency: {renderAgency(agency)}
                </div>
                <div className="article__text">
                  Launches: {setContent(process, () => renderLaunches(launchesList), null, LaunchesSkeleton)}
                </div>
              </div>
              <div className="profile__right">
                <img className='profile__avatar' src={image} alt={name} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

const LaunchesSkeleton = () => {
  return (
    <div className="article__text">
      <Skeleton width="200px" />
    </div>
  )
}

export default SingleCrewLayout