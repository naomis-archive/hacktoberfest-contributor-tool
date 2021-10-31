/**
 * This interface is used specifically for test data,
 * and is scoped to the specific properties we look for.
 */
export interface TestPullRequest {
  number: number;
  created_at: string;
  merged_at: string | null;
  closed_at: string | null;
  user?: {
    login: string;
    type: string;
  };
  labels?: {
    id?: number;
    node_id?: string;
    url?: string;
    name?: string;
    description?: string;
    color?: string;
    default?: boolean;
  }[];
}
