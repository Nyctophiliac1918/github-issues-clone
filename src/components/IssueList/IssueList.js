import React, { useCallback, useEffect, useState } from 'react'
import Issue from '../Issue/Issue';
import './IssueList.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { REPO_OWNER, REPO_NAME, OPEN, CLOSED } from '../../utilities/constants';
import IssueListIcons from '../Icons/IssueListIcons';

const options = [
  'Author', 'Label', 'Projects', 'Milestones', 'Assignee', 'Sort'
];

function IssueListHeader({type, handleClick}) {
  return (
    <div className='issue-list-header'>
      <div className='count'>
        <div name='open' onClick={handleClick} className={`issues-count ${type ==='closed' && 'faded'}`}>
          <span name='open' className='icon'><IssueListIcons fill="black" type='open' /></span>
          <span name='open'>{OPEN} Open</span>
        </div>
        <div name='closed' onClick={handleClick} className={`issues-count ${type ==='open' && 'faded'}`}>
          <span name='closed' className='icon'><IssueListIcons type='check' /></span>
          <span name='closed'>{CLOSED} Closed</span>
        </div>
      </div>
      <div className='options'>
      {
        options.map(option => (
          <div key={option} className='d-flex'>
            <span>{option}</span>
            <span className='icon'><IssueListIcons type='down' /></span>
          </div>))
      }
      </div>
    </div>
  );
}

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [issuesAvailable, setIssuesAvailable] = useState(true);
  const [type, setType] = useState('open')

  const loadIssues = useCallback(() => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?page=${page}&state=${type}&per_page=30`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.length < 30)
          setIssuesAvailable(false);
        setIssues(oldIssues => [...oldIssues, ...data]);
        setPage(page+1);
      })
  }, [page, type]);

  useEffect(() => {
    loadIssues();
  }, [type]);

  const handleClick = (e) => {
    if (e.target.name === type)
      return;
    
    setType(e.target.getAttribute('name'));
    setIssues([]);
    setPage(1);
  }

  return (
    <InfiniteScroll
      dataLength={issues}
      next={loadIssues}
      hasMore={issuesAvailable}
      loader={<div className='list-width'><h4>Loading...</h4></div>}
    >
      <div className="issue-list">
        <IssueListHeader handleClick={handleClick} type={type} />
        { issues.map((issue) => {
          return <Issue key={issue.id} issueData={issue} />
        }) }
      </div>
    </InfiniteScroll>
  )
}