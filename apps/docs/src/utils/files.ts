/**
 * Extracts file extension index in file name.
 *
 * Dotfiles in format `.file-name` don't have an extension, so -1 will be returned.
 *
 * @param name File name
 * @returns Index or -1, if file doesn't have extension
 */
export function getExtensionIndex(name: string) {
  const index = name.lastIndexOf(".")
  return index <= 0 ? -1 : index
}

/**
 * Extracts file extension from file name
 * @param name File name
 * @returns Extension or empty string, if file doesn't have an extension
 */
export function getFileExtension(name: string) {
  const extIndex = getExtensionIndex(name);
  return extIndex === -1 ? "" : name.substring(extIndex + 1);
}

export function getFileName(path: string) {
  return path.substring(path.lastIndexOf("/") + 1)
}

export function getBaseName(path: string) {
  const fullName = getFileName(path)
  const extIndex = getExtensionIndex(fullName);
  return extIndex === -1 ? fullName : fullName.substring(0, extIndex);
}