import React, { useEffect, useState } from 'react'
import Issue from '../Issue/Issue';
import './IssueList.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { REPO_OWNER, REPO_NAME } from '../../utilities/constants';
import IssueListIcons from '../Icons/IssueListIcons';

const options = [
  'Author', 'Label', 'Projects', 'Milestones', 'Assignee', 'Sort'
];

function IssueListHeader() {
  return (
    <div className='issue-list-header'>
      <div className='count'>
        <div className='issues-count'>
          <span className='icon'><IssueListIcons fill="black" type='open' /></span>
          <span>711 Open</span>
        </div>
        <div className='issues-count faded'>
          <span className='icon'><IssueListIcons type='check' /></span>
          <span>10,811 Closed</span>
        </div>
      </div>
      <div className='options'>
      {
        options.map(option => (
          <div className='issues-count'>
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

  const loadIssues = () => {
    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIssues(oldIssues => {
          return oldIssues.concat(data);
        });
        setPage(page+1);
      })
  }

  useEffect(() => {
    loadIssues();
  }, [])

  return (
    <InfiniteScroll
      dataLength={issues}
      next={loadIssues}
      hasMore={true}
      loader={<div className='list-width'><h4>Loading...</h4></div>}
    >
      <div className="IssueList">
        <IssueListHeader />
        { issues.map((issue) => {
          return <Issue key={issue.id} issueData={issue} />
        }) }
      </div>
    </InfiniteScroll>
  )
}