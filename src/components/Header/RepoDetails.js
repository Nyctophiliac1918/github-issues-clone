import React, { useState, useEffect } from 'react';
import Icon from '../Icons/HeaderIcons';
import { REPO_NAME, REPO_OWNER } from '../../utilities/constants';
import convertToKs from '../../utilities/convertToKs';

export default function RepoDetails() {
  const [forks, setForks] = useState(null);
  const [stars, setStars] = useState(null);

  const loadStats = () => {
    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`)
      .then(res => res.json())
      .then(data => {
        const {stargazers_count, forks_count} = data;
        setForks(convertToKs(forks_count));
        setStars(convertToKs(stargazers_count));
      })
  }

  useEffect(() => {
    loadStats();
  }, [])

  return (
    <div className='repo-details'>
      <div className='repo-name'>
        <Icon type='repo' />
        <span>{REPO_OWNER}</span> / <span className='bolder'>{REPO_NAME}</span>
        <span className='label'>Public</span>
      </div>
      <div className='repo-stats'>
        <span>
          <div className='icon'><Icon type='notifications' /></div>
          <div className='text'>Notifications</div>
        </span>
        <span className='with-data'>
          <div className='icon'><Icon type='star' /></div>
          <div className='text'>Star</div>
          <div className="count">{stars}</div>
        </span>
        <span className='with-data'>
          <div className='icon'><Icon type='fork' /></div>
          <div className='text'>Fork</div>
          <div className="count">{forks}</div>
        </span>
      </div>
    </div>
  )
}