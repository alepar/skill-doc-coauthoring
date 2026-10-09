# doc-coauthoring evals

Scenarios in the format of Anthropic's skill-authoring guide: a query, optional files, and the behaviours a good run shows. Each one plants a gap the revised skill is meant to catch.

To run one: start a fresh Claude Code session in a scratch directory with only this skill installed, paste the `query` (attach `files` if listed), play the user for a few turns, and check each `expected_behavior`. Run the same scenario with the upstream skill (or no skill) as the baseline. A behaviour counts only if it happened without prompting.
