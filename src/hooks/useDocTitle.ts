/*
 * @Author: Dong
 * @Date: 2020-04-12 05:27:52
 * @LastEditors: Dong
 * @LastEditTime: 2020-09-07 09:49:52
 */
import { useEffect } from 'react';

export function useDocTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  });
}
