import React from "react";
import Icon from "../Icons/IssueListIcons";
import Label from "../Label/Label";
import "./Issue.css";
import timePastIssue from "../../utilities/timePastIssue";

export default function Issue(props) {
    const { issueData: issue } = props;
    const time =
        issue.state === "open"
            ? timePastIssue(new Date(issue.created_at))
            : timePastIssue(new Date(issue.closed_at));

    return (
        <div className="issue">
            <div className="issue-icon">
                <Icon type={issue.state} />
            </div>
            <div className="issue-details">
                <span className="issue-title">{issue.title}</span>
                <span className="issue-labels">
                    {issue.labels.map((label) => (
                        <Label key={label.id} label={label} />
                    ))}
                </span>
                <div className="issue-meta">
                    #{issue.number}{" "}
                    {issue.state === "open" ? "opened" : "closed"} {time} by{" "}
                    <a className="issue-user" href={issue.user.html_url}>
                        {issue.user.login}
                    </a>
                </div>
            </div>
            <div className="issue-extras">
                <div className="issue-extra-col">
                    {issue.pull_request && (
                        <a
                            className="issue-extra-link"
                            href={issue.pull_request.html_url}
                        >
                            <Icon type="pull-request" /> 1
                        </a>
                    )}
                </div>
                <div className="issue-extra-col">
                    {issue.assignees.length > 0 &&
                        issue.assignees.map((assignee) => (
                            <a
                                className="issue-extra-link"
                                key={assignee.id}
                                href={assignee.html_url}
                            >
                                <img
                                    className="issue-assignee-img"
                                    src={assignee.avatar_url}
                                    alt={assignee.login}
                                />
                            </a>
                        ))}
                </div>
                <div className="issue-extra-col">
                    {issue.comments > 0 && (
                        <a
                            className="issue-extra-link"
                            href={issue.comments_url}
                        >
                            <Icon type="comment" /> {issue.comments}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
