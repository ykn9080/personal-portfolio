"use client";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Link from "next/Link";

import React from "react";

export default function ChakraList({ blogs, lang }) {
  return (
    <div>
      <List spacing={3}>
        {blogs.map((blog) => {
          if (blog.slug.endsWith(lang) && blog.meta.type === "interest")
            return (
              <ListItem>
                <Stack spacing={4} direction="row">
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={blog.meta.featureImage}
                    alt="Dan Abramov"
                  />
                  <div className="grow flex flex-col justify-between lg:mx-6">
                    <Link
                      className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
                      href={`${lang}/blogs/${blog.slug}`}
                    >
                      <div className="text-lg font-bold hover:underline">
                        {blog.meta.title}
                      </div>
                      <div className="text-sm">{blog.meta.excerpt}</div>
                    </Link>
                  </div>
                </Stack>
              </ListItem>
            );
        })}
      </List>
    </div>
  );
}
