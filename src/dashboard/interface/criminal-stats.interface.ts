export interface CriminalStatsInterface {
  total: number;
  byProfileType: Array<{
    profileTypeName: string;
    count: number;
  }>;
  byBirthplace: Array<{
    birthplace: string;
    count: number;
  }>;
  byYear: Array<{
    year: number;
    count: number;
  }>;
  willBeReleasedThisMonth: Array<{
    id: number;
    name: string;
    description: string;
    endExecuteDate: string;
  }>;
  willBeReleasedNextMonth: Array<{
    id: number;
    name: string;
    description: string;
    endExecuteDate: string;
  }>;
  recentlyReleased: Array<{
    id: number;
    name: string;
    description: string;
    doneExecuteDate: string;
  }>;
}
