
import semverCmp from 'semver/functions/cmp';
import valid from 'semver/functions/valid';

type Comparator = '=' | '!=' | '<' | '>' | '<=' | '>=';

export default function getCompareIsAllinCartVersion(
  getAllinCartVersion: () => Promise<string>
) {
  return async (comparator: Comparator, versionToCompare: string): Promise<boolean> => {
    const allincartVersion = await getAllinCartVersion();
    const allincartSemverVersion = convertToSemver(allincartVersion);
    const versionSemverToCompare = convertToSemver(versionToCompare);

    return semverCmp(allincartSemverVersion, comparator, versionSemverToCompare);
  };
}

function convertToSemver(version: string): string {
  // Test if version is a 4 digit allincart version with leading 6.
  if (!valid(version) && /6\.[\d]+\.[\d]+\.[\d]+/.test(version)) {
    return version.substring(2);
  }

  return version;
}
